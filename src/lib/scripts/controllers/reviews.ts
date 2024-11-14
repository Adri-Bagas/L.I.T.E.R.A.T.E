import CONFIG from '$lib/config/config';
import { error } from '@sveltejs/kit';

const Reviews = {
	store: async function (token: string | undefined, id: number, datas: any) {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', `Bearer ${token}`);
		myHeaders.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			book_id: id,
			review: datas.reviews,
			rating: datas.rating
		});

		const requestOptions: RequestInit = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'manual'
		};

		try {
			const response = await fetch(`${CONFIG.apiUrl}/reviews`, requestOptions);
			const result = await response.json();

			return result;
		} catch (errors) {
			console.error(errors);
			error(500, `${errors}`);
		}
	}
};

export default Reviews;
