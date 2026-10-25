import z from "zod";

export const CreateProjectValidationSchema = z.object({
  projectName: z.string().trim().min(1, "Project name is required"),
  repoUrl: z.string().trim().min(1, "Repo link is required"),
  liveLink: z.string().trim().min(1, "Live link is required"),
  description: z.string().trim().min(1, "Description is required"),
});
