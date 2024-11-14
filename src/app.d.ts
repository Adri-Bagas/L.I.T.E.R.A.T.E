// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { string } from 'zod';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type UserSafe = {
		id: string;
		username: string;
		email: string;
		last_active: string | null | undefined | Date;
	};

	type Member = {
		id: number;
		username: string;
		full_name: string;
		email: string;
		password: string;
		phone_number: string;
		address: string;
		created_at?: string;
		updated_at?: string;
		deleted_at?: string;
		last_active?: string;
		profile_pic?: string;
		transactions?: TransactionLoanReturn[];
	};

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
	};

	type Category = {
		id: number;
		name: string;
		desc: string;
		created_at?: string;
		updated_at?: string;
		deleted_at?: string;
		created_by?: number;
		updated_by?: number;
	};

	type Book = {
		id: number;
		ISBN: string;
		title: string;
		lang: string;
		num_of_pages: number;
		price?: number;
		desc: string;
		created_at?: string;
		updated_at?: string;
		deleted_at?: string;
		created_by?: number;
		updated_by?: number;
		deleted_by?: number;
		is_enabled: boolean;
		is_online: boolean;
		stock: number;
		authors: string[];
		authors_id: number[];
		publisher: string;
		publisher_id: number;
		tags: string[];
		categories: string[];
		categories_id: number[];
		qty: number;
		condition: string | number;
		books: BookDetails[];
		media_loc?: string;
		reviews: AvgWithReviews;
	};

	type BookDetails = {
		id: number;
		title: string;
		sn: string;
		condition: string | number;
		status: string | number;
		price?: number;
	};

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
	};

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
	};

	type TransactionInventoryInOut = {
		id: number;
		date: string;
		detail: string;
		created_at: string;
		approver: User;
	};

	type TransactionLoanReturn = {
		id: number;
		date: string;
		expected_return_date?: string;
		detail: string;
		created_at: string;
		approval_status?: string;
		is_returned?: boolean;
		penalty?: number;
		member: Member;
		approver: User;
		books: BookDetails[];
	};

	type BookSmallView = {
		id: number;
		book_detail_id: number;
		title: string;
		desc?: string;
		is_online: boolean;
		media_loc?: string;
	};

	type Reviews = {
		id: number;
		member_dd: number;
		member_name: string;
		book_id: number;
		review: string;
		rating: number;
		created_at: string;
		updated_at?: string;
	};

	type AvgWithReviews = {
		avg: number
		reviews: Reviews[]
	}
}

export {};
