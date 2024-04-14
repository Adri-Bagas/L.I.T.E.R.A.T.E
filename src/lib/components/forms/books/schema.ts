import { z } from 'zod';

export const formBookSchema = z.object({
	title: z.string().min(1),
	isbn: z.string().min(10),
	lang: z.string().min(1),
	numOfPage: z.number().nullable().default(null),
	price: z.number().nullable(),
	author_id: z.array(z.number()).min(1, "You must include at least one Author on the Book!"),
	category_id: z.array(z.number()).min(1, "You must include at least one Category on the Book!"),
	publisher_id: z.string(),
	desc: z.string().nullable(),
	is_online: z.boolean().default(false),
	is_enabled: z.boolean().default(false),
	files: z.instanceof(File, { message: 'Please upload a file.'}).nullable()
});

export type FormBookSchema = typeof formBookSchema;
