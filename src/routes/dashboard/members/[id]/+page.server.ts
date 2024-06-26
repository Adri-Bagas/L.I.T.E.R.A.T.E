import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import Member from "$lib/scripts/controllers/member";

export const load: PageServerLoad = async (events) => {

	const {cookies, params} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let member:any = await Member.findWithDetails(token, params.id)

	return {
		title: "Book | L.I.T.E.R.A.T.E",
		member: member.data,
	};
};