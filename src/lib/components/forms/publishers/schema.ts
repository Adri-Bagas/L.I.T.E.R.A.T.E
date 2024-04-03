import { z } from 'zod';

export const formPublisherSchema = z.object({
	name: z.string().min(6),
	desc: z.string().min(6),
    phone_number: z.string().min(10),
    address: z.string().optional()
});

export type FormPublisherSchema = typeof formPublisherSchema;
