import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET(events) {

    let { cookies } = events

    cookies.delete("to", {
        path: "/"
    })

    cookies.delete("user", {
        path: "/"
    })

    throw redirect(307, "/")
};