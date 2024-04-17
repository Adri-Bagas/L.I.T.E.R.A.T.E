import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import Loan from "$lib/scripts/controllers/transactions/loan.js";


export const load: PageServerLoad = async (events) => {

	const {cookies} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let transactions: TransactionLoanReturn[] = await Loan.getAll(token)
	// let usersDeleted: UserSafe[] = await User.getAllThrashed(token)

	return {
		title: "Loan | L.I.T.E.R.A.T.E",
		transactions,
	};
};