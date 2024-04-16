
import { formInventoryInSchema } from "$lib/components/forms/transaction/inventory-in/schema.js";
import Book from "$lib/scripts/controllers/books.js";
// import InventoryIn from "$lib/scripts/controllers/transactions/inventory-in.js";
// import { error, redirect } from "@sveltejs/kit";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}) {


    let token = cookies.get('to')

    let books: BookDetails[] = await Book.getAllBooksDetails(token)

    return {
        form: await superValidate(zod(formInventoryInSchema)),
        title: "Inventory Out | L.I.T.E.R.A.T.E",
        books,
        to: token
    };
};

export const actions = {
	default: async ({ request, cookies }) => {
		
		const form = await superValidate(request, zod(formInventoryInSchema));

		if (!form.valid || form.data.books_qty.size < 1) {
			return fail(400, { form });
		}

        // let token = cookies.get('to')

		// let datas = await InventoryIn.store(token, form.data);

        // if (datas.success == true) {
        //     redirect(300, "/dashboard/transaction/inventory-in")
        // } else {
        //     error(datas.status_code, datas.msg);
        // }

        return { form }
	}
};