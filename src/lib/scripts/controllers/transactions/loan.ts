import CONFIG from '$lib/config/config';
import { error } from '@sveltejs/kit';

const InventoryIn = {
	getAll: async function (token: string | undefined) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/transaction/loaning`, requestOptions);
			const result = await response.json();

			if (result.success == true) {
				if (result.datas == null) {
					return [];
				}
				return result.datas;
			} else {
				error(response.status, result.msg);
			}
		} catch (errors) {
			console.log(errors);
			error(500, `${errors}`);
		}
	},
	store: async function (token: string | undefined, datas: any) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);
		myHeaders.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			transaction_type: 'LOAN',
			date: datas.date,
			detail: datas.detail,
			books_qty: Object.fromEntries(datas.books_qty)
		});


		const requestOptions: RequestInit = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/transaction`, requestOptions);
			const result = await response.json();

			return result;
		} catch (errors) {
			console.error(errors);
			error(500, `${errors}`);
		}
	}
};

export default InventoryIn;
