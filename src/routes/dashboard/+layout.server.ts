import { Me } from "$lib/scripts/controllers/auth.js";

import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async (events) => {


	let user: UserSafe = await Me(events)


	return {
		user
	};
};