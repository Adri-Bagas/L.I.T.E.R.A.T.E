import { z } from "zod";

export const formMemberSchema = z.object({
    username: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(6),
    full_name: z.string().min(3),
    phone_number: z.string().min(3),
    address: z.string().min(3),
});

export type FormMemberSchema = typeof formMemberSchema;