import { z } from "zod";

export const postThreadSchema = z.object({
    content: z.string(),
    media: z.array(z.instanceof(File)).optional(),
});

export type PostThreadSchema = z.infer<typeof postThreadSchema>;