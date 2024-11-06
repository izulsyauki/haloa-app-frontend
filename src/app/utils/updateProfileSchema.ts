import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string()
    .min(3, "Full Name minimal 3 characters")
    .max(50, "Full Name maximal 50 characters"),
  username: z.string()
    .min(3, "Username minimal 3 characters")
    .max(30, "Username maximal 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username only contains letters, numbers, and underscores"),
  bio: z.string().max(160, "Bio maximal 160 characters").optional(),
  avatar: z.any().optional(),
  banner: z.any().optional(),
});

export type UpdateProfileFormInputs = z.infer<typeof updateProfileSchema>;