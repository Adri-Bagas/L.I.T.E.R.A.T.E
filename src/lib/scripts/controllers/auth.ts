import { error, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import CONFIG from '$lib/config/config';

const Login = async (email: string, password: string) => {
	const formdata = new FormData();
	formdata.append('email', email);
	formdata.append('password', password);

	const requestOptions: RequestInit = {
		method: 'POST',
		body: formdata,
		redirect: 'manual'
	};

	try {
		const response = await fetch(`${CONFIG.apiUrl}/auth/login/member`, requestOptions);
		const result = await response.json();
		if (response.status == 200) {
            return result
		} else {
			error(response.status, result.msg);
		}
	} catch (errors) {
        console.log(errors)
		error(500, `${errors}`);
	}
};

const Me = async (events: ServerLoadEvent) => {

    let { cookies } = events

    let user = cookies.get("user")

    if(user != null || user != undefined){
        return JSON.parse(user)
    }

    let token = cookies.get('to')

	const myHeaders = new Headers();
	myHeaders.append(
		'Authorization',
		`Bearer ${token}`
	);

	const requestOptions: RequestInit = {
		method: 'POST',
		headers: myHeaders,
		redirect: 'manual'
	};

	try {
		const response = await fetch(`${CONFIG.apiUrl}/auth/me`, requestOptions);
		const result = await response.json();
		
        if(response.status == 200){
            return result;
        } else {
            return false;
        }
	} catch (errors) {
		throw errors
	}
};

const LogOut = async (events: ServerLoadEvent) => {

    let { cookies } = events

    cookies.delete("to", {
        path: "/"
    })

    cookies.delete("user", {
        path: "/"
    })

    redirect(300, "/")
}

export { Login, Me, LogOut };
