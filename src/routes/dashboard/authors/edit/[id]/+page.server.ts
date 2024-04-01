import { formAuthorSchema } from "$lib/components/forms/authors/schema";
import Author from "$lib/scripts/controllers/authors.js";
import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {

    let token = cookies.get('to')

    let author = await Author.find(token, params.id)

    return {
        form: await superValidate(zod(formAuthorSchema)),
        title: "Author | L.I.T.E.R.A.T.E",
        author: author.data
    };
};

export const actions = {
	default: async ({ request, cookies, params }) => {
		
		const form = await superValidate(request, zod(formAuthorSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

        let token = cookies.get('to')

		let datas = await Author.update(token, params.id, form.data);

        if (datas.success == true) {
            redirect(300, "/dashboard/authors")
        } else {
            error(datas.status_code, datas.msg);
        }

		return {form}
	}
};