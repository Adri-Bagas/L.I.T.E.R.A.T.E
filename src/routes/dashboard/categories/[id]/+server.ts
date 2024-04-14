import Category from '$lib/scripts/controllers/category.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return new Response();
}

export async function DELETE({ cookies, params }) {
	let token = cookies.get('to');

	let datas = await Category.delete(token, params.id);

	return json(datas)
}
