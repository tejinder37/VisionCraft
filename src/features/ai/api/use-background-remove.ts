import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.ai)["remove-background"]["$post"]
>;

type RequestType = InferRequestType<
  (typeof client.api.ai)["remove-background"]["$post"]
>["json"];

export const useRemoveBackground = () => {
  const mutation = useMutation<{ data: string }, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.ai["remove-background"].$post({ json });
      const result = await response.json();
      if ('error' in result) {
        throw new Error(result.error);
      }
      return result as { data: string };
    },
  });
  return mutation;
};