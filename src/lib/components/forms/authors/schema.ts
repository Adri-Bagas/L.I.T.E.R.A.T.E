import { z } from "zod";

export const formAuthorSchema = z.object({
    name: z.string().min(6),
    desc: z.string().min(6),
});

export type FormAuthorSchema = typeof formAuthorSchema;