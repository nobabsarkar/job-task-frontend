import { ProjectQuery } from "@/components/card/admin-get-all-project";
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

export function adminGetAllProject(params: ProjectQuery) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      query.set(key, String(value));
    }
  });

  return apiClient(`/projects/all-projects?${query.toString()}`);
}

export function adminGetProjectStatistics() {
  return apiClient("/projects/statistics");
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
