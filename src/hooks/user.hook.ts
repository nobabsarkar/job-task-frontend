import { adminGetAllUsers } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export function useAdminGetAllUser() {
  return useQuery({
    queryKey: ["admin-all-users"],
    queryFn: adminGetAllUsers,
    retry: false,
  });
}
