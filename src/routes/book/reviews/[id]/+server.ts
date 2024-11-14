import Reviews from '$lib/scripts/controllers/reviews.js';
import { json, redirect } from '@sveltejs/kit';

export async function POST({ request, cookies, params }) {

	let reqBod = await request.json();

    let token = cookies.get('to');

	let datas = await Reviews.store(token, parseInt(params.id), reqBod);

	return json(datas)
};