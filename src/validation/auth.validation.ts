import z from "zod";

export const RegistrationSchema = z.object({
  name: z
    .string("Not A String!!!")
    .min(3, "Name must be atleast 3 characters")
    .max(15, "Name Letter is over of 15"),
  email: z.email("Not email"),
  password: z.string().min(6, "Password Must Minimum 6 Characters"),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password Must Minimum 6 Characters"),
});
