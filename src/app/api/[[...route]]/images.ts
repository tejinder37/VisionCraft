import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { unsplash } from "@/lib/unsplash";

// Define search params schema
const searchParamsSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(30).default(20),
  color: z
    .enum([
      "black_and_white",
      "black",
      "white",
      "yellow",
      "orange",
      "red",
      "purple",
      "magenta",
      "green",
      "teal",
      "blue",
    ])
    .optional(),
  orientation: z.enum(["landscape", "portrait", "squarish"]).optional(),
});

// Create Hono app

const app = new Hono().get(
  "/",
  zValidator("query", searchParamsSchema),
  async (c) => {
    const { query, page, perPage, color, orientation } = c.req.valid("query");

    try {
      let response;

      if (query) {
        console.log("Performing search with query:", query);
        const searchResult = await unsplash.search.getPhotos({
          query,
          page,
          perPage,
          color,
          orientation,
        });

        if (searchResult.errors) {
          throw new Error(JSON.stringify(searchResult.errors));
        }

        response = {
          images: searchResult.response.results,
          total: searchResult.response.total || 0,
          total_pages: searchResult.response.total_pages || 1,
        };
      } else {
        const randomResult = await unsplash.photos.getRandom({
          count: perPage,
        });

        if (randomResult.errors) {
          throw new Error(JSON.stringify(randomResult.errors));
        }

        const images = Array.isArray(randomResult.response)
          ? randomResult.response
          : [randomResult.response];

        response = {
          images,
          total: images.length,
          total_pages: 1,
        };
      }

      return c.json({ data: response });
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ error: error.message }, 500);
      } else {
        return c.json({ error: "An unknown error occurred" }, 500);
      }
    }
  }
);

export default app;
