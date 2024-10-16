import { z } from "zod";

export const signinSchema = z.object({
    emailOrUsername: z.string().min(3),
    password: z.string().min(6),
  });

export type SigninForm = z.infer<typeof signinSchema>;