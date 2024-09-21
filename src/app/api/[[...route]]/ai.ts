import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import fetch from "node-fetch";
import FormData from "form-data";
import { generateImage } from "@/lib/openai";
import { verifyAuth } from "@hono/auth-js";

const app = new Hono()
  .post(
    "/remove-background",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        imageUrl: z.string().url(),
      })
    ),
    async (c) => {
      const { imageUrl } = c.req.valid("json");
      const API_URL = "https://api.remove.bg/v1.0/removebg";
      const API_KEY = process.env.REMOVE_BG_API_KEY;

      if (!API_KEY) {
        return c.json({ error: "Remove.bg API key is not set" }, 500);
      }

      const formData = new FormData();
      formData.append("image_url", imageUrl);
      formData.append("size", "auto");

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "X-Api-Key": API_KEY,
            ...formData.getHeaders(),
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to remove background: ${response.statusText}`
          );
        }

        const buffer = await response.buffer();
        const base64 = buffer.toString("base64");
        return c.json({ data: `data:image/png;base64,${base64}` });
      } catch (error) {
        console.error("Error in removeBackground:", error);
        return c.json({ error: "Failed to remove background" }, 500);
      }
    }
  )
  .post(
    "/generate-image",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      })
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");
      console.log(prompt);
      console.log("Received a prompt");

      const output = generateImage(prompt);
      const res = output as unknown as Array<string>;
      return c.json({ data: res[0] });
    }
  );

export default app;
