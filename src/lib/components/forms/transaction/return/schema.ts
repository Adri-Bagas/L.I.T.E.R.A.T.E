import { z } from "zod";

export const formReturnSchema = z.object({
    date: z.string().min(1),
    detail: z.string().min(1),
    penalty: z.number().default(0),
    books_qty: z.map(z.number(), z.any()),
    transaction_id: z.number(),
    member_id: z.number()
});

export type FormReturnSchema = typeof formReturnSchema;