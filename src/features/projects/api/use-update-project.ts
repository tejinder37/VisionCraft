import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$patch"],
  200
>;
type ReqestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$patch"]
>["json"];

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();

  // useQuery can have shared states  of errors, loading but useMutation have different instance for every 
  // time we used that in any project.
  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationKey: ["project", {id}],
    mutationFn: async (json) => {
      const response = await client.api.projects[":id"].$patch({
        param: {
          id,
        },
        json,
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      return await response.json();
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      // to refetch data after create, update & delete & have a more low level code.
      queryClient.invalidateQueries({ queryKey: ["project", { id }] });
    },
    onError() {
      toast.error("Failed to update project");
    },
  });
  return mutation;
};
