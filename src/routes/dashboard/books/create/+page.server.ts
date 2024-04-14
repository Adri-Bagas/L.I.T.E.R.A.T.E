import { formBookSchema } from "$lib/components/forms/books/schema.js";
import Author from "$lib/scripts/controllers/authors.js";
import Category from "$lib/scripts/controllers/category.js";
import Publisher from "$lib/scripts/controllers/publishers.js";
import User from "$lib/scripts/controllers/users.js";
import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {

    let token = cookies.get('to')

    const authors = await Author.getAllIdName(token)
    const publishers = await Publisher.getAllIdName(token)
    const categories = await Category.getAllIdName(token)

    return {
        form: await superValidate(zod(formBookSchema)),
        title: "Book | L.I.T.E.R.A.T.E",
        authors,
        publishers,
        categories,
        token
    };
};

export const actions = {
	default: async ({ request }) => {
		
		const form = await superValidate(request, zod(formBookSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
        return { form };
	}
};