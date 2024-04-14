import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import Author from "$lib/scripts/controllers/authors.js";


export const load: PageServerLoad = async (events) => {

	const {cookies} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let author: Author[] = await Author.getAll(token)
	// let usersDeleted: UserSafe[] = await User.getAllThrashed(token)

	return {
		title: "Author | L.I.T.E.R.A.T.E",
		author,
	};
};