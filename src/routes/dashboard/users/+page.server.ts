import User from "$lib/scripts/controllers/users.js";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";


export const load: PageServerLoad = async (events) => {



	const {cookies} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let users: UserSafe[] = await User.getAll(token)


	return {
		title: "User | L.I.T.E.R.A.T.E",
		users
	};
};