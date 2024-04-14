import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import Category from "$lib/scripts/controllers/category.js";


export const load: PageServerLoad = async (events) => {

	const {cookies} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let category: Category[] = await Category.getAll(token)
	// let usersDeleted: UserSafe[] = await User.getAllThrashed(token)

	return {
		title: "Category | L.I.T.E.R.A.T.E",
		category,
	};
};