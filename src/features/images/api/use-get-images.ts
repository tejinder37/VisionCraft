import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

interface UseGetImagesProps {
  searchQuery: string;
  page: number;
  perPage: number;
  color?: string;
  orientation?: string;
}

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description?: string | null;
  user: {
    name: string;
  };
  links: {
    html: string;
  };
}

interface ImageResponse {
  images: UnsplashImage[];
  total: number;
  total_pages: number;
}

export const useGetImages = ({
  searchQuery,
  page,
  perPage,
  color,
  orientation,
}: UseGetImagesProps) => {
  return useQuery<ImageResponse, Error>({
    queryKey: ["images", searchQuery, page, perPage, color, orientation],
    queryFn: async () => {
      const response = await client.api.images.$get({
        query: {
          query: searchQuery,
          page: page.toString(),
          perPage: perPage.toString(),
          ...(color && { color }),
          ...(orientation && { orientation }),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      console.log(response);
      
      const { data } = await response.json();
      console.log(data);

      return data;
    },
  });
};
