<script lang="ts">
	import CONFIG from '$lib/config/config';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label/index.js';
	import StarRating from '@ernane/svelte-star-rating';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import WaitingSomething from '$lib/scripts/stores/waiting-something';
	import { toast } from 'svelte-sonner';
	export let data;

	let bookCover: string = `${CONFIG.mediaUrl}/${data.book.media_loc}/image-00000.jpg`;

	const config = {
		readOnly: false,
		countStars: 5,
		range: {
			min: 0,
			max: 5,
			step: 0.001
		},
		score: 0.0,
		showScore: true,
		scoreFormat: function () {
			return `(${this.score.toFixed(0)}/${this.countStars})`;
		},
		name: '',
		starConfig: {
			size: 30,
			fillColor: '#0A74FF',
			strokeColor: '#BB8511',
			unfilledColor: '#FFF',
			strokeUnfilledColor: '#000'
		}
	};

	let review: string;

	let borrowOnline = `book/reviews/${data.id}`;

	async function postReviews() {
		WaitingSomething.set(true);

		let deleteUrl = `${window.location.origin}/${borrowOnline}`;

		console.log(deleteUrl);

		const requestOptions: RequestInit = {
			method: 'POST',
			headers: {
				'content-type': 'text/html; charset=UTF-8'
			},
			redirect: 'manual',
			body: JSON.stringify({
				reviews: review,
				rating: config.score
			})
		};

		const response = await fetch(deleteUrl, requestOptions);
		const result = await response.json();

		WaitingSomething.set(false);

		if (result.msg === 'JWT token missing or invalid') {
			goto('/login');
		}

		if (result.success) {
			toast.success(result.msg);
			goto(`/home`);
		} else {
			toast.error(result.msg);
		}
	}
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div class="hero flex h-screen w-screen items-center justify-center gap-6">
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />

	<div class="flex w-1/2 flex-col items-center justify-center p-16">
		<h1 class="text-4xl">Thank you for returning this book!</h1>
		<div
			class="left-4 flex items-stretch text-center text-lg font-semibold italic tracking-tight text-white"
		>
			<h2>"{data.quote}"</h2>
		</div>
		<div
			class="bottom-8 left-4 flex items-stretch text-lg font-semibold italic tracking-tight text-white"
		>
			<h2>- {data.author}</h2>
		</div>
	</div>

	<div class="flex w-1/2 flex-col items-center justify-center p-16">
		<img class="z-20 -mb-4 h-[12rem] w-[8rem] rounded-lg" alt="buku" src={bookCover} />

		<Card.Root class="w-full bg-primary-foreground opacity-100">
			<Card.Header>
				<h1 class="text-center text-2xl">Leave a Review!</h1>
			</Card.Header>
			<Card.Content>
				<StarRating {config} />

				<Label for="review">Reviews</Label>
				<Textarea id="review" rows={8} class="resize-none" bind:value={review}></Textarea>

				<div class="mt-6 flex items-center justify-center gap-x-4">
					<Button variant={'destructive'} class="w-24">Skip</Button>
					<Button class="w-24" variant={'outline'} on:click={postReviews}>Submit</Button>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>

<style lang="scss">
	.hero {
		background-color: transparent;
		position: relative;
		height: 100vh;
		overflow: hidden;
		font-family: 'Montserrat', sans-serif;
	}

	.cube {
		position: absolute;
		z-index: -1;
		top: 80vh;
		left: 45vw;
		width: 10px;
		height: 10px;
		border: solid 1px darken(#0040c1, 8%);
		border-radius: 2px;
		transform-origin: top left;
		transform: scale(0) rotate(0deg) translate(-50%, -50%);
		animation: cube 12s ease-in forwards infinite;

		&:nth-child(2n) {
			border-color: lighten(#0040c1, 10%);
		}

		&:nth-child(2) {
			animation-delay: 2s;
			left: 25vw;
			top: 40vh;
		}

		&:nth-child(3) {
			animation-delay: 4s;
			left: 75vw;
			top: 50vh;
		}

		&:nth-child(4) {
			animation-delay: 6s;
			left: 90vw;
			top: 10vh;
		}

		&:nth-child(5) {
			animation-delay: 8s;
			left: 10vw;
			top: 85vh;
		}

		&:nth-child(6) {
			animation-delay: 10s;
			left: 50vw;
			top: 10vh;
		}

		&:nth-child(7) {
			animation-delay: 12s;
			left: 5vw;
			top: 18vh;
		}

		&:nth-child(8) {
			animation-delay: 15s;
			left: 83vw;
			top: 80vh;
		}
	}

	@keyframes cube {
		from {
			transform: scale(0) rotate(0deg) translate(-50%, -50%);
			opacity: 1;
		}
		to {
			transform: scale(20) rotate(960deg) translate(-50%, -50%);
			opacity: 0;
		}
	}
</style>
