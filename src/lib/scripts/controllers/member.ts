import CONFIG from '$lib/config/config';
import { error } from '@sveltejs/kit';

const Member = {
	getAll: async function (token: string | undefined) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/member`, requestOptions);
			const result = await response.json();

			if (result.success == true) {
				if(result.datas == null){
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
    getAllThrashed: async function (token: string | undefined) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/member/thrashed`, requestOptions);
			const result = await response.json();

			if (result.success == true) {
				if(result.datas == null){
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

		const formdata = new FormData();
		formdata.append('username', datas.username);
		formdata.append('email', datas.email);
		formdata.append('password', datas.password);
		formdata.append("full_name", datas.full_name);
		formdata.append("phone_number", datas.phone_number);
		formdata.append("address", datas.address);
		

		const requestOptions: RequestInit = {
			method: 'POST',
			headers: myHeaders,
			body: formdata,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/member`, requestOptions);
			const result = await response.json();

			return result;
		} catch (errors) {
			console.error(errors);
			error(500, `${errors}`);
		}
	},
	find: async function (token: string | undefined, id: string) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/member/${id}`, requestOptions);
			const result = await response.json();
			return result;
		} catch (error) {
			console.error(error);
		}
	},
	update: async function (token: string | undefined, id: string, datas: any) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);
		
		const formdata = new FormData();
		formdata.append('username', datas.username);
		formdata.append('email', datas.email);
		formdata.append('password', datas.password);
		formdata.append("full_name", datas.full_name);
		formdata.append("phone_number", datas.phone_number);
		formdata.append("address", datas.address);

		const requestOptions: RequestInit = {
			method: 'PUT',
			headers: myHeaders,
			body: formdata,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/member/${id}`, requestOptions);
			const result = await response.json();
			return result;
		} catch (error) {
			console.error(error);
		}
	},
	delete: async function (token: string | undefined, id: string) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'DELETE',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/member/${id}`, requestOptions);
			const result = await response.json();
			return result
		} catch (error) {
			console.error(error);
		}
	}
};

export default Member;
