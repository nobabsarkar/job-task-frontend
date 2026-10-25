import apiClient from "@/lib/apiClient";
import { ICreatePorject } from "@/types/project.type";

export function userCreateProject(payload: ICreatePorject) {
  return apiClient("/projects/create-project", {
    method: "POST",
    body: payload,
  });
}
