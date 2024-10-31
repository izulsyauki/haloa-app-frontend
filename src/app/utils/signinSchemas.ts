import { z } from "zod";

export const signinSchema = z.object({
    username: z.string().min(3, "Invalid email or username"),
    password: z.string().min(6, "Invalid password"),
});

export type SigninFormInputs = z.infer<typeof signinSchema>;
