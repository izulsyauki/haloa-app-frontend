import { z } from "zod";

export const signupSchema = z.object({
    fullName: z.string().min(3, "Full Name is required"),
    username: z.string().min(3, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

export type SignupFormInputs = z.infer<typeof signupSchema>;