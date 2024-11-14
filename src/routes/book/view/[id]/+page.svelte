<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import CONFIG from '$lib/config/config.js';
	import WaitingSomething from '$lib/scripts/stores/waiting-something';
	import { toast } from 'svelte-sonner';

	export let data;

	let borrowOnline = `book/view/${data.id}`;

	async function genKeyAndMoveAway() {
		WaitingSomething.set(true);

		let deleteUrl = `${window.location.origin}/${borrowOnline}`;

		const requestOptions: RequestInit = {
			method: 'POST',
			headers: {
				'content-type': 'text/html; charset=UTF-8'
			},
			redirect: 'manual',
			body: JSON.stringify({
				type: 1
			})
		};

		const response = await fetch(deleteUrl, requestOptions);
		const result = await response.json();

		WaitingSomething.set(false);

		if (result.success) {
			toast.success(result.msg);

      console.log(result.data)

      window.open(`${CONFIG.readerAppUrl}?access_key=${result.data.access_key}#mode/2up`)

			// goto(`/book/reviews/${result.data}`);
		} else {
			toast.error(result.msg);
		}
	}

	async function returnLoan() {
		WaitingSomething.set(true);

		let deleteUrl = `${window.location.origin}/${borrowOnline}`;

		const requestOptions: RequestInit = {
			method: 'POST',
			headers: {
				'content-type': 'text/html; charset=UTF-8'
			},
			redirect: 'manual',
			body: JSON.stringify({
				type: 0
			})
		};

		const response = await fetch(deleteUrl, requestOptions);
		const result = await response.json();

		WaitingSomething.set(false);

		if (result.success) {
			toast.success(result.msg);
			goto(`/book/reviews/${result.data}`);
		} else {
			toast.error(result.msg);
		}
	}
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div class="hero flex h-screen w-screen flex-col items-center justify-center gap-6">
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />
	<div class="cube" />

	<h1 class="text-7xl">Make Connection to Viewer App ...</h1>

	<Button on:click={genKeyAndMoveAway}>Get New Access Key!</Button>

	<Button on:click={returnLoan}>Return the Book!</Button>
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
