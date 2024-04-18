
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import Book from "$lib/scripts/controllers/books.js";


export const load: PageServerLoad = async (events) => {

	const {cookies} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let books: Book[] = await Book.getAll(token)
	// let usersDeleted: UserSafe[] = await User.getAllThrashed(token)

	return {
		title: "Book | L.I.T.E.R.A.T.E",
		books,
	};
};