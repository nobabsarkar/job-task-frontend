import z from "zod";

export const projectValidation = z.object({
  projectName: z.string().min(3, "must use 3 word").max(10, "over 10 word"),
  repoUrl: z
    .string()
    .trim()
    .url("Please enter a valid GitHub profile URL")
    .refine(
      (url) => /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/.test(url),
      "Please enter a valid GitHub profile URL",
    ),

  liveLink: z
    .string()
    .trim()
    .url("Please enter a valid live project URL")
    .refine((url) => url.startsWith("https://"), "Live link must use HTTPS"),

  description: z.string().min(5, "must use 3 word").max(20, "over 20 word"),
});
