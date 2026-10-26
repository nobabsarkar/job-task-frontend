// import z from "zod";

// export const CreateProjectValidationSchema = z.object({
//   projectName: z.string().trim().min(1, "Project name is required"),
//   repoUrl: z.string().trim().min(1, "Repo link is required"),
//   liveLink: z.string().trim().min(1, "Live link is required"),
//   description: z.string().trim().min(1, "Description is required"),
// });

import { z } from "zod";

export const CreateProjectValidationSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters")
    .max(20, "Project name cannot exceed 20 characters"),

  repoUrl: z
    .string()
    .trim()
    .min(1, "Repository URL is required")
    .url("Please provide a valid repository URL")
    .refine((value) => {
      try {
        const url = new URL(value);

        return (
          url.protocol === "https:" &&
          url.hostname === "github.com" &&
          /^\/[^/]+\/[^/]+\/?$/.test(url.pathname)
        );
      } catch {
        return false;
      }
    }, "Please provide a valid GitHub repository URL"),

  liveLink: z
    .string()
    .trim()
    .min(1, "Live link is required")
    .url("Please provide a valid live project URL")
    .refine((value) => {
      try {
        const url = new URL(value);

        return url.protocol === "https:" || url.protocol === "http:";
      } catch {
        return false;
      }
    }, "Live link must use HTTP or HTTPS"),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters")
    .max(50, "Description cannot exceed 50 characters"),
});
