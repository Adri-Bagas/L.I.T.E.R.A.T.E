import type { PageServerLoad } from './$types.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/components/forms/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { Login } from '$lib/scripts/controllers/auth.js';
import { redirect } from '@sveltejs/kit';


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
		form: await superValidate(zod(formSchema)),
		title: 'Login | L.I.T.E.R.A.T.E',
		quote,
		author
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		
		const form = await superValidate(request, zod(formSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		let datas = await Login(form.data.email, form.data.password)

		if(datas.success){
			cookies.set('to', datas.data.token, {
				path: "/",
				httpOnly: true
			})
	
			cookies.set('user', JSON.stringify(datas.data.user), {
				path: "/",
				httpOnly: false,
				secure: false
			})

			redirect(300, "/dashboard")
		}

		return {form}
	}
};
