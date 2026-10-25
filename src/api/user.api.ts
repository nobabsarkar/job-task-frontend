import apiClient from "@/lib/apiClient";

export function adminGetAllUsers() {
  return apiClient("/users/all");
}
