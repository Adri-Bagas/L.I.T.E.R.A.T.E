import Loan from '$lib/scripts/controllers/transactions/loan.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies, params }) {
    let token = cookies.get('to');

    let reqBod = await request.json();

    let datas


    if(reqBod.type == 1){
        datas = await Loan.genBookAccess(token, parseInt(params.id))
        return json(datas)
    }

	datas = await Loan.storeOnlineReturn(token, parseInt(params.id));

	return json(datas)
};