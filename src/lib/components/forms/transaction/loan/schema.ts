import { z } from "zod";

export const formInventoryInSchema = z.object({
    date: z.string().min(1),
    detail: z.string().min(1),
    books_id: z.array(z.number())
});

export type FormInventoryInSchema = typeof formInventoryInSchema;