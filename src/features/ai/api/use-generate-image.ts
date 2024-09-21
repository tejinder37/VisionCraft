import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.ai)["generate-image"]["$post"]
>;
type ReqestType = InferRequestType<
  (typeof client.api.ai)["generate-image"]["$post"]
>["json"];

export const useGenerateImage = () => {
  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async (json) => {
      const response = await client.api.ai["generate-image"].$post({ json });
      return await response.json();
    },
  });
  return mutation;
};
