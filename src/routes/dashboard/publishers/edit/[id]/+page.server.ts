import { formAuthorSchema } from "$lib/components/forms/authors/schema";
import Publisher from "$lib/scripts/controllers/publishers.js";
import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {

    let token = cookies.get('to')

    let publisher = await Publisher.find(token, params.id)

    return {
        form: await superValidate(zod(formAuthorSchema)),
        title: "Publisher | L.I.T.E.R.A.T.E",
        author: publisher.data
    };
};

export const actions = {
	default: async ({ request, cookies, params }) => {
		
		const form = await superValidate(request, zod(formAuthorSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

        let token = cookies.get('to')

		let datas = await Publisher.update(token, params.id, form.data);

        if (datas.success == true) {
            redirect(300, "/dashboard/publishers")
        } else {
            error(datas.status_code, datas.msg);
        }

		return {form}
	}
};