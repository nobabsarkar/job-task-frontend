import { adminGetAllUsers, adminUpdateUserRole } from "@/api/user.api";
import { UserRole } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminGetAllUser() {
  return useQuery({
    queryKey: ["admin-all-users"],
    queryFn: adminGetAllUsers,
    retry: false,
  });
}

export function useAdminUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      adminUpdateUserRole(id, role),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-all-users"],
      });
    },
  });
}
