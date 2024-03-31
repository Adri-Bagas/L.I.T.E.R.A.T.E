
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async (events) => {


	return {
		title: "Dashboard | L.I.T.E.R.A.T.E",
	};
};