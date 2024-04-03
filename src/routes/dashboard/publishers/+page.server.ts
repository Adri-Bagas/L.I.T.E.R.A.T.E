import User from "$lib/scripts/controllers/users.js";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import Publisher from "$lib/scripts/controllers/publishers.js";


export const load: PageServerLoad = async (events) => {

	const {cookies} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let publishers: Publisher[] = await Publisher.getAll(token)
	// let usersDeleted: UserSafe[] = await User.getAllThrashed(token)

	return {
		title: "Publisher | L.I.T.E.R.A.T.E",
		publishers,
	};
};