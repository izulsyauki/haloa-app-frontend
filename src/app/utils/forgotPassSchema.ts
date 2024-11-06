import { z } from "zod";

export const forgotPassSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPassInputs = z.infer<typeof forgotPassSchema>;