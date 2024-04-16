import { formUserSchema } from "$lib/components/forms/users/schema";
import Member from "$lib/scripts/controllers/member.js";
import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {

    let token = cookies.get('to')

    let member = await Member.find(token, params.id)

    return {
        form: await superValidate(zod(formUserSchema)),
        title: "Member | L.I.T.E.R.A.T.E",
        member: member.data
    };
};

export const actions = {
	default: async ({ request, cookies, params }) => {
		
		const form = await superValidate(request, zod(formUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

        let token = cookies.get('to')

		let datas = await Member.update(token, params.id, form.data);

        if (datas.success == true) {
            redirect(300, "/dashboard/members")
        } else {
            error(datas.status_code, datas.msg);
        }

		return {form}
	}
};