import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$delete"],
  200
>;
type ReqestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$delete"]
>["param"];

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  // useQuery can have shared states  of errors, loading but useMutation have different instance for every
  // time we used that in any project.
  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async (param) => {
      const response = await client.api.projects[":id"].$delete({
        param,
      });
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      return await response.json();
    },
    onSuccess({ data }) {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["projects", { id: data.id }],
      });
    },
    onError() {
      toast.error("Failed to delete project");
    },
  });
  return mutation;
};
