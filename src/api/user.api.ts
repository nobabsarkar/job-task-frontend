import apiClient from "@/lib/apiClient";
import { UserRole } from "@/types/user.type";

export function adminGetAllUsers() {
  return apiClient("/users/all");
}

export function adminUpdateUserRole(id: string, role: UserRole) {
  return apiClient(`/users/update-role/${id}`, {
    method: "PATCH",
    body: {
      role,
    },
  });
}
