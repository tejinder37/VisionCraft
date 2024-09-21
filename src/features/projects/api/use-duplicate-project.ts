import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"],
  200
>;
type ReqestType = InferRequestType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"]
>["param"];

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  // useQuery can have shared states  of errors, loading but useMutation have different instance for every
  // time we used that in any project.
  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async (param) => {
      const response = await client.api.projects[":id"].duplicate.$post({
        param
      });
      if (!response.ok) {
        throw new Error("Failed to duplicate project");
      }
      return await response.json();
    },
    onSuccess() {
      toast.success("Project updated.");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError() {
      toast.error("Failed to duplicate project");
    },
  });
  return mutation;
};
