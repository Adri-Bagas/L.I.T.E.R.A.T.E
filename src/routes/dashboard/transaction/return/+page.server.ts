import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import InventoryIn from "$lib/scripts/controllers/transactions/inventory-in.js";


export const load: PageServerLoad = async (events) => {

	const {cookies} = events

	let token = cookies.get('to')

	if(token == undefined){
		redirect(304, "/login")
	}

	let transactions: TransactionInventoryInOut[] = await InventoryIn.getAll(token)
	// let usersDeleted: UserSafe[] = await User.getAllThrashed(token)

	return {
		title: "Inventory In | L.I.T.E.R.A.T.E",
		transactions,
	};
};