import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import Book from "$lib/scripts/controllers/books";

export const load: PageServerLoad = async (events) => {

	const {cookies, params} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	return {
		title: "Book | L.I.T.E.R.A.T.E",
        id: params.id
	};
};