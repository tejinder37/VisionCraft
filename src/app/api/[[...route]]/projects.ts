import { db } from "@/db/drizzle";
import { projects, projectsInsertSchema, users } from "@/db/schema";
import { unsplash } from "@/lib/unsplash";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

// Define template categories
const templateCategories = [
  { name: "Wedding Cards", query: "wedding invitation template" },
  { name: "Birthday Cards", query: "birthday invitation template" },
  { name: "Business Cards", query: "business card template" },
  { name: "Flyers", query: "flyer template" },
  { name: "Posters", query: "poster template" },
];

// Define search params schema
const searchParamsSchema = z.object({
  category: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(30).default(20),
  search: z.string().optional(),
});

const app = new Hono()
  .get("/templates", zValidator("query", searchParamsSchema), async (c) => {
    const { category, page, perPage, search } = c.req.valid("query");

    try {
      let response;

      if (category) {
        const searchQuery = category
          ? `${search || ""} ${
              templateCategories.find(
                (cat) => cat.name.toLowerCase() === category.toLowerCase()
              )?.query || ""
            }`
          : search || "";

        const searchResult = await unsplash.search.getPhotos({
          query: searchQuery,
          page,
          perPage,
          orderBy: "relevant",
        });

        if (searchResult.errors) {
          throw new Error(JSON.stringify(searchResult.errors));
        }

        response = {
          templates: searchResult.response.results.map((photo) => ({
            id: photo.id,
            name:
              photo.description || photo.alt_description || "Untitled Template",
            thumbnailUrl: photo.urls.small,
            fullResolutionUrl: photo.urls.full,
            width: photo.width,
            height: photo.height,
            category: category || "Uncategorized",
            author: photo.user.name,
            downloadLocation: photo.links.download_location,
          })),
          total: searchResult.response.total || 0,
          total_pages: searchResult.response.total_pages || 1,
        };
      } else {
        console.log("inide the else");
        
        // Fetch templates from all categories
        const categoryPromises = templateCategories.map((cat) =>
          unsplash.search.getPhotos({
            query: cat.query,
            page: 1,
            perPage: Math.floor(perPage / templateCategories.length),
            orderBy: "relevant",
          })
        );

        const categoryResults = await Promise.all(categoryPromises);

        const templates = categoryResults.flatMap((result, index) =>
          result?.response?.results.map((photo) => ({
            id: photo.id,
            name:
              photo.description || photo.alt_description || "Untitled Template",
            thumbnailUrl: photo.urls.small,
            fullResolutionUrl: photo.urls.full,
            width: photo.width,
            height: photo.height,
            category: templateCategories[index].name,
            author: photo.user.name,
            downloadLocation: photo.links.download_location,
          }))
        );

        response = {
          templates,
          total: templates.length,
          total_pages: 1,
        };
      }

      return c.json({ data: response });
    } catch (error) {
      console.error("Error fetching templates:", error);

      if (error instanceof Error) {
        return c.json({ error: error.message }, 500);
      } else {
        return c.json({ error: "An unknown error occurred" }, 500);
      }
    }
  })
  .delete(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: { id } });
    }
  )
  .post(
    "/:id/duplicate",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));
      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      const project = data[0];
      const duplicateData = await db
        .insert(projects)
        .values({
          name: `Copy of ${project.name}`,
          json: project.json,
          width: project.width,
          height: project.height,
          userId: auth?.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!duplicateData[0]) {
        return c.json({ error: "Something went wrong" }, 404);
      }
      return c.json({ data: duplicateData[0] });
    }
  )
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { page, limit } = c.req.valid("query");
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, auth.token.id))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "json",
      projectsInsertSchema
        .omit({
          // omtting things from user when updating project. using omit method of zValidator.
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial() // only selecting somethings from the schema.
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .update(projects)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      return c.json({ data: data[0] });
    }
  )
  .get(
    "/:id",
    verifyAuth(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data: data[0] });
    }
  )
  .post(
    "/",
    verifyAuth(),
    zValidator(
      "json",
      projectsInsertSchema.pick({
        name: true,
        json: true,
        height: true,
        width: true,
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { name, json, height, width } = c.req.valid("json");

      if (!auth.token?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const data = await db
        .insert(projects)
        .values({
          name,
          json,
          width,
          height,
          userId: auth.token.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning(); // to return data i.e created

      if (!data[0]) {
        return c.json({ error: "Something went wrong" }, 400);
      }
      return c.json({ data: data[0] });
    }
  );

export default app;
