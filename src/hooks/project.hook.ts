import { userCreateProject } from "@/api/project.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userCreateProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project"],
      });
    },
  });
}
