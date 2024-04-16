import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import InventoryOut from "$lib/scripts/controllers/transactions/inventory-out.js";


export const load: PageServerLoad = async (events) => {

	const {cookies} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let transactions: TransactionInventoryInOut[] = await InventoryOut.getAll(token)
	// let usersDeleted: UserSafe[] = await User.getAllThrashed(token)

	return {
		title: "Loan | L.I.T.E.R.A.T.E",
		transactions,
	};
};