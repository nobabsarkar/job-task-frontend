import apiClient from "@/lib/apiClient";
import { ICreatePorject, IUpdateProjectStatus } from "@/types/project.type";

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

export function updateStudentProjectStatus(
  id: string,
  payload: IUpdateProjectStatus,
) {
  return apiClient(`/projects/status/${id}`, {
    method: "PATCH",
    body: payload,
  });
}
