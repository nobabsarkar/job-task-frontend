import {
  adminGetAllProject,
  updateStudentProjectStatus,
  userCreateProject,
  userGetMyProject,
} from "@/api/project.api";
import { ProjectQuery } from "@/components/card/admin-get-all-project";
import { IUpdateProjectStatus } from "@/types/project.type";
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

export function useAdminGetAllProject(params: ProjectQuery) {
  return useQuery({
    queryKey: ["project", params],
    queryFn: () => adminGetAllProject(params),
    retry: false,
  });
}

export function useUpdateStudentProjectStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateProjectStatus;
    }) => updateStudentProjectStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project"],
      });
    },
  });
}
