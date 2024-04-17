import CONFIG from '$lib/config/config';
import { error } from '@sveltejs/kit';

const Loan = {
	getAll: async function (token: string | undefined) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/transaction/loan`, requestOptions);
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
	getAllIdName: async function (token: string | undefined) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/transaction/loan/all/ids`, requestOptions);
			const result = await response.json();

			if (response.status == 200) {
				return result;
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
			member_id: datas.member_id,
			date: datas.date,
			detail: datas.detail,
			books_id: datas.books_id
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
	},
	find: async function (token: string | undefined, id: number) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/transaction/loan/${id}`, requestOptions);
			const result = await response.json();
			return result;
		} catch (error) {
			console.error(error);
			return;
		}
	}
};

export default Loan;
