import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import Member from "$lib/scripts/controllers/member.js";


export const load: PageServerLoad = async (events) => {

	const {cookies} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let members: Member[] = await Member.getAll(token)
	let membersDeleted: Member[] = await Member.getAllThrashed(token)

	return {
		title: "Member | L.I.T.E.R.A.T.E",
		members,
		membersDeleted
	};
};