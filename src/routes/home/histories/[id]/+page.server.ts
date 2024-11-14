import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import Loan from "$lib/scripts/controllers/transactions/loan";

export const load: PageServerLoad = async (events) => {

	const {cookies, params} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let transaction:any = await Loan.find(token, parseInt(params.id))

	return {
		title: "Loan | L.I.T.E.R.A.T.E",
		transaction: transaction.data,
	};
};