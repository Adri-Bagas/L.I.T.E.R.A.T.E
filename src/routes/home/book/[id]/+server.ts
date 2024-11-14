import Loan from '$lib/scripts/controllers/transactions/loan.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, params }) {
    let token = cookies.get('to');

	let datas = await Loan.storeOnline(token, parseInt(params.id));

	return json(datas)
};