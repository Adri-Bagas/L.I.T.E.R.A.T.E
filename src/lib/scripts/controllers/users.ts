import { error } from "@sveltejs/kit";

const User = {
	getAll: async function (token: string | undefined) {

		const myHeaders = new Headers();
		myHeaders.append(
			'Authorization',
			`Bearer ${token}`
		);

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'manual'
		};

		try {
			const response = await fetch('http://localhost:1323/user', requestOptions);
			const result = await response.json();
			
            if(result.success == true){
                return result.datas
            }else{
                error(response.status, result.msg)
            }

		} catch (errors) {
            console.log(errors)
            error(500, `${errors}`);
		}
	}
};

export default User;
