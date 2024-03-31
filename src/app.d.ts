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
}

export {};
