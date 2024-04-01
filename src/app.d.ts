// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type UserSafe = {
		id:string,
		username: string,
		email: string,
		last_active: string | null | undefined | Date
	}

	type Author = {
		id: number;
		name: string;
		desc: string;
		created_at?: string;
		updated_at?: string;
		deleted_at?: string;
		created_by?: number;
		updated_by?: number;
		deleted_by?: number;
	}

	type Book = {
		id: number;
		ISBN: string;
		address: string;
		phone_number: string;
		num_of_pages: number;
		price?: number;
		desc: string;
		sypnosis: string;
		created_at?: string;
		updated_at?: string;
		deleted_at?: string;
		created_by?: number;
		updated_by?: number;
		deleted_by?: number;
		author_id?: number;
		publisher_id?: number;
	}

	type Publisher = {
		id: number;
		name: string;
		address: string;
		phone_number: string;
		desc: string;
		created_at?: string;
		updated_at?: string;
		deleted_at?: string;
		created_by?: number;
		updated_by?: number;
		deleted_by?: number;
	}

	type User = {
		id: number;
		username: string;
		email: string;
		password: string;
		last_active?: string;
		created_at?: string;
		updated_at?: string;
		deleted_at?: string;
		created_by?: number;
		updated_by?: number;
		deleted_by?: number;
		role: number;
		profile_pic?: string;
	}
}

export {};
