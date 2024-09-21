import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export type Template = {
  id: string;
  name: string;
  thumbnailUrl: string;
  fullResolutionUrl: string;
  width: number;
  height: number;
  category: string;
  author: string;
  downloadLocation: string;
};

export type TemplatesResponse = {
  templates: Template[];
  total: number;
  total_pages: number;
};

type RequestType = {
  category?: string;
  page: string;
  perPage: string;
  search?: string;
};

export const useGetTemplates = (apiQuery: RequestType) => {
  const query = useQuery({
    queryKey: ["templates", apiQuery],
    queryFn: async () => {
      const response = await client.api.projects.templates.$get({
        query: apiQuery,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }

      const { data } = await response.json();
      return data as TemplatesResponse;
    },
  });

  return query;
};
