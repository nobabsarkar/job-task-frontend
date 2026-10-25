export interface ICreatePorject {
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
}

export interface IUpdateProjectStatus {
  status: "APPROVED" | "REJECTED";
}
