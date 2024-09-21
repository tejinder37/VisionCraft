import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.users)["$post"]>;
type ReqestType = InferRequestType<(typeof client.api.users)["$post"]>["json"];

export const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async (json) => {
      const response = await client.api.users.$post({ json });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("User created");
    },
  });
  return mutation;
};
