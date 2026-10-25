import { userCreateProject, userGetMyProject } from "@/api/project.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useGetMyProject() {
  return useQuery({
    queryKey: ["project"],
    queryFn: userGetMyProject,
    retry: false,
  });
}
