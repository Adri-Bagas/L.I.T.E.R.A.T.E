import type { PageServerLoad } from './$types.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/components/forms/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { Login } from '$lib/scripts/controllers/auth.js';
import { error, redirect } from '@sveltejs/kit';
import { formMemberSchema } from '$lib/components/forms/members/schema.js';
import Member from '$lib/scripts/controllers/member.js';
import WaitingSomething from '$lib/scripts/stores/waiting-something.js';


export const load: PageServerLoad = async () => {

	const requestOptions: RequestInit = {
		method: 'GET',
		redirect: 'manual'
	};

	let quote: string = 'When the World give you lemon, You shall make a lemonade!';
	let author: string = 'Myself the creator of the web!';

	try {
		const response = await fetch('https://api.quotable.io/random?minLength=100', requestOptions);
		const result = await response.json();

		quote = result.content;
		author = result.author;
	} catch (error) {
		//console.error(error);
	}

	return {
		form: await superValidate(zod(formMemberSchema)),
		title: 'Login | L.I.T.E.R.A.T.E',
		quote,
		author
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(formMemberSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		WaitingSomething.set(true);

		let datas = await Member.store(form.data);

		WaitingSomething.set(false);

        if (datas.success == true) {
            redirect(300, "/login")
        } else {
            error(datas.status_code, datas.msg);
        }

		return {form}
	}
};
