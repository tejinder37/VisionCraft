import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)["$post"],
  200
>;
type ReqestType = InferRequestType<
  (typeof client.api.projects)["$post"]
>["json"];

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects.$post({ json });
      if (!response.ok) {
        throw new Error();
      }
      return await response.json();
    },
    onSuccess() {
      toast.success("Project created");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError() {
      toast.error("Failed to create project");
    },
  });
  return mutation;
};
