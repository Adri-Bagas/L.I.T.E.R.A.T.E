import { z } from "zod";

export const formLoanSchema = z.object({
    date: z.string().min(1),
    detail: z.string().min(1),
    books_id: z.array(z.number()),
    member_id: z.number(),
});

export type FormLoanSchema = typeof formLoanSchema;