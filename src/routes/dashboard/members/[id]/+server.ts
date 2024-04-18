import Member from '$lib/scripts/controllers/member.js';
import { error, json, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return new Response();
}

export async function DELETE({ cookies, params }) {
	let token = cookies.get('to');

	let datas = await Member.delete(token, params.id);

	return json(datas)
}
