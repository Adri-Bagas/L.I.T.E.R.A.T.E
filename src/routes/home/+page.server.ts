
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async (events) => {

	const { cookies } = events

	const tok = cookies.get('to')

	return {
		title: "Home | L.I.T.E.R.A.T.E",
		tok
	};
};