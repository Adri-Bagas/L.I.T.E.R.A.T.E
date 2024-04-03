import Publisher from '$lib/scripts/controllers/publishers.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return new Response();
}

export async function DELETE({ cookies, params }) {
	let token = cookies.get('to');

	let datas = await Publisher.delete(token, params.id);

	return json(datas)
}
