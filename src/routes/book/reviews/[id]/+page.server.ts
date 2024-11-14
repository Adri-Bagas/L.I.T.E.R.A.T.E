import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import Book from "$lib/scripts/controllers/books";

export const load: PageServerLoad = async (events) => {

	const {cookies, params} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

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

    let book:any = await Book.findWithDetails(token, params.id)

	return {
		title: "Book | L.I.T.E.R.A.T.E",
        id: params.id,
        book: book.data,
        quote,
		author
	};
};