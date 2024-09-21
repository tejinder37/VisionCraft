import { z } from "zod";

export const searchParamsSchema = z.object({
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

export type SearchParams = z.infer<typeof searchParamsSchema>;
