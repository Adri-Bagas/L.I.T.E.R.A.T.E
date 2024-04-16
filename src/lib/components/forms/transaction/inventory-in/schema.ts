import { z } from "zod";

export const formInventoryInSchema = z.object({
    date: z.string().min(1),
    detail: z.string().min(1),
    books_qty: z.map(z.number(), z.any())
});

export type FormInventoryInSchema = typeof formInventoryInSchema;