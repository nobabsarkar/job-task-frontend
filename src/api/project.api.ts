import apiClient from "@/lib/apiClient";
import { ICreatePorject } from "@/types/project.type";

export function userCreateProject(payload: ICreatePorject) {
  return apiClient("/projects/create-project", {
    method: "POST",
    body: payload,
  });
}

export function userGetMyProject() {
  return apiClient("/projects/own-project");
}

export function adminGetAllProject() {
  return apiClient("/projects/all-projects");
}
