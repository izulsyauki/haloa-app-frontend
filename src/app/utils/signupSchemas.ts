import { z } from "zod";

export const signupSchema = z.object({
    fullName: z.string()
    .min(3, "Full Name minimal 3 characters")
    .max(50, "Full Name maximal 50 characters"),
    username: z.string()
    .min(3, "Username minimal 3 characters")
    .max(30, "Username maximal 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username only contains letters, numbers, and underscores"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

export type SignupFormInputs = z.infer<typeof signupSchema>;