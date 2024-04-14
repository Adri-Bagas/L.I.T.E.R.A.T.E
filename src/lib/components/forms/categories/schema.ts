import { z } from "zod";

export const formCategorySchema = z.object({
    name: z.string().min(6),
    desc: z.string().nullable()
});

export type FormCategorySchema = typeof formCategorySchema;