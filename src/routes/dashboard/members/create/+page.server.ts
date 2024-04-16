import { formMemberSchema } from "$lib/components/forms/members/schema.js";
import Member from "$lib/scripts/controllers/member.js";
import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        form: await superValidate(zod(formMemberSchema)),
        title: "Member | L.I.T.E.R.A.T.E"
    };
};

export const actions = {
	default: async ({ request, cookies }) => {
		
		const form = await superValidate(request, zod(formMemberSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

        let token = cookies.get('to')

		let datas = await Member.store(token, form.data);

        if (datas.success == true) {
            redirect(300, "/dashboard/members")
        } else {
            error(datas.status_code, datas.msg);
        }

		return {form}
	}
};