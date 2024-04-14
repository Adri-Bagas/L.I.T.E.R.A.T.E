import { formUserSchema } from '$lib/components/forms/users/schema';
import Author from '$lib/scripts/controllers/authors.js';
import Book from '$lib/scripts/controllers/books.js';
import Category from '$lib/scripts/controllers/category.js';
import Publisher from '$lib/scripts/controllers/publishers.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	let token = cookies.get('to');

	let book = await Book.find(token, params.id);

    const authors = await Author.getAllIdName(token)
    const publishers = await Publisher.getAllIdName(token)
    const categories = await Category.getAllIdName(token)

	return {
		form: await superValidate(zod(formUserSchema)),
		title: 'User | L.I.T.E.R.A.T.E',
		book: book.data,
        authors,
        publishers,
        categories,
        token
	};
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(formUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form };
	}
};
