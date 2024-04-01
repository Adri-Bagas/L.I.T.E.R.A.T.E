import { formUserSchema } from "$lib/components/forms/users/schema";
import User from "$lib/scripts/controllers/users.js";
import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        form: await superValidate(zod(formUserSchema)),
        title: "User | L.I.T.E.R.A.T.E"
    };
};

export const actions = {
	default: async ({ request, cookies }) => {
		
		const form = await superValidate(request, zod(formUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

        let token = cookies.get('to')

		let datas = await User.store(token, form.data);

        if (datas.success == true) {
            redirect(300, "/dashboard/users")
        } else {
            error(datas.status_code, datas.msg);
        }

		return {form}
	}
};