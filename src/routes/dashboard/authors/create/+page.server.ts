import { formPublisherSchema } from "$lib/components/forms/publishers/schema";
import Author from "$lib/scripts/controllers/authors.js";
import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        form: await superValidate(zod(formPublisherSchema)),
        title: "Author | L.I.T.E.R.A.T.E"
    };
};

export const actions = {
	default: async ({ request, cookies }) => {
		
		const form = await superValidate(request, zod(formPublisherSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

        let token = cookies.get('to')

		let datas = await Author.store(token, form.data);

        if (datas.success == true) {
            redirect(300, "/dashboard/authors")
        } else {
            error(datas.status_code, datas.msg);
        }

		return {form}
	}
};