import { z } from "zod";

export const resetPasswordSchema = z.object({
    newPassword: z.string()
      .min(6, "Password minimal 6 characters"),
    confirmPassword: z.string()
      .min(6, "Password minimal 6 characters"),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });
  
export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;