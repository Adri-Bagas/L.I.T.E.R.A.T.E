import { formLoanSchema } from "$lib/components/forms/transaction/loan/schema.js";
import Loan from "$lib/scripts/controllers/transactions/loan.js";
import { fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}) {


    let token = cookies.get('to')

    let transactions = await Loan.getAllIdName(token);

    return {
        form: await superValidate(zod(formLoanSchema)),
        title: "Return | L.I.T.E.R.A.T.E",
        to: token,
        transactions
    };
};

export const actions = {
	default: async ({ request, cookies }) => {
		
		const form = await superValidate(request, zod(formLoanSchema));

		if (!form.valid || form.data.books_id.length < 1) {
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