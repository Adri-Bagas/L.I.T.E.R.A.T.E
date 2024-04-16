import CONFIG from '$lib/config/config';
import { error } from '@sveltejs/kit';

const Book = {
	getAll: async function (token: string | undefined) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/book`, requestOptions);
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
	getAllThrashed: async function (token: string | undefined) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/book/thrashed`, requestOptions);
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
		// console.log(datas);

		// return;

		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);
		myHeaders.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			title: datas.title,
			isbn: datas.isbn,
			lang: datas.lang,
			num_of_pages: datas.num_of_pages,
			publisher_id: parseInt(datas.publisher_id),
			author_id: datas.author_id.map((val: any) => parseInt(val)),
			category_id: datas.category_id.map((val: any) => parseInt(val)),
			tags: [],
			price: datas.price,
			desc: datas.desc,
			is_online: datas.is_online,
			is_enabled: datas.is_enabled
		});

		const requestOptions: RequestInit = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/book`, requestOptions);
			const result = await response.json();

			if (response.status == 200) {
				if(datas.is_enabled){
					if(datas.files != null || datas.files != undefined){
						await this.uploadBook(token, result.data.id, datas.files, datas.title);
					}
				}
				
				return result;
			} else {
				console.error(result.msg);
				return result;
			}
		} catch (errors) {
			console.error(errors);
			error(500, `${errors}`);
		}
	},

	uploadBook: async function (token: string | undefined, id: string, file: File, title: string) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const formdata = new FormData();
		formdata.append('file', file);
		formdata.append('title', title);

		const requestOptions: RequestInit = {
			method: 'POST',
			body: formdata,
			redirect: 'manual',
			headers: myHeaders
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/book/upload/pdf/${id}`, requestOptions);
			const result = await response.json();
			console.log(result);
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
			const response = await fetch(`${CONFIG.apiUrl}/book/${id}`, requestOptions);
			const result = await response.json();
			return result;
		} catch (error) {
			console.error(error);
		}
	},
	update: async function (token: string | undefined, id: string, datas: any) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);
		myHeaders.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			title: datas.title,
			isbn: datas.isbn,
			lang: datas.lang,
			num_of_pages: datas.num_of_pages,
			publisher_id: parseInt(datas.publisher_id),
			author_id: datas.author_id.map((val: any) => parseInt(val)),
			category_id: datas.category_id.map((val: any) => parseInt(val)),
			tags: [],
			price: datas.price,
			desc: datas.desc,
			is_online: datas.is_online,
			is_enabled: datas.is_enabled
		});

		const requestOptions: RequestInit = {
			method: 'PUT',
			headers: myHeaders,
			body: raw,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/book/${id}`, requestOptions);
			const result = await response.json();
			if (response.status == 200) {
				if(datas.is_enabled){
					if(datas.files != null || datas.files != undefined){
						await this.uploadBook(token, result.data.id, datas.files, datas.title);
					}
				}
				
				return result;
			} else {
				console.error(result.msg);
				return result;
			}
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
			const response = await fetch(`${CONFIG.apiUrl}/book/${id}`, requestOptions);
			const result = await response.json();
			return result;
		} catch (error) {
			console.error(error);
		}
	},
	getAllBooksDetails: async function (token: string | undefined) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/book/details`, requestOptions);
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
};

export default Book;
