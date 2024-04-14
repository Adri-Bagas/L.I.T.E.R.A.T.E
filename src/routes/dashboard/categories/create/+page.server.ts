import { formCategorySchema } from "$lib/components/forms/categories/schema.js";
import Category from "$lib/scripts/controllers/category.js";
import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        form: await superValidate(zod(formCategorySchema)),
        title: "Author | L.I.T.E.R.A.T.E"
    };
};

export const actions = {
	default: async ({ request, cookies }) => {
		
		const form = await superValidate(request, zod(formCategorySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

        let token = cookies.get('to')

		let datas = await Category.store(token, form.data);

        if (datas.success == true) {
            redirect(300, "/dashboard/authors")
        } else {
            error(datas.status_code, datas.msg);
        }

		return {form}
	}
};