import { formCategorySchema } from "$lib/components/forms/categories/schema.js";
import Category from "$lib/scripts/controllers/category.js";
import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {

    let token = cookies.get('to')

    let category = await Category.find(token, params.id)

    return {
        form: await superValidate(zod(formCategorySchema)),
        title: "Category | L.I.T.E.R.A.T.E",
        category: category.data
    };
};

export const actions = {
	default: async ({ request, cookies, params }) => {
		
		const form = await superValidate(request, zod(formCategorySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

        let token = cookies.get('to')

		let datas = await Category.update(token, params.id, form.data);

        if (datas.success == true) {
            redirect(300, "/dashboard/publishers")
        } else {
            error(datas.status_code, datas.msg);
        }

		return {form}
	}
};