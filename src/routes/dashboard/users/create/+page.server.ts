import { formUserSchema } from "$lib/components/forms/users/schema";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        form: await superValidate(zod(formUserSchema)),
        title: "User | L.I.T.E.R.A.T.E"
    };
};