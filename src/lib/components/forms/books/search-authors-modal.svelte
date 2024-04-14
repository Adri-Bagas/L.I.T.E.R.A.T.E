<script lang="ts">
	import { mode } from 'mode-watcher';
	import { createEventDispatcher, onMount } from 'svelte';
	import Select from 'svelte-select';
	let listOpen = false;

	let isLight: boolean | undefined;

	export let authors: any;

	mode.subscribe((val) => {
		isLight = val != 'dark' ? true : false;
	});

	let items: any[] = [];
	let value: any;

	const dispatch = createEventDispatcher();

	function closeModalWithData() {
		dispatch('close', value);
	}

	onMount(() => {
		for (const [key, val] of Object.entries(authors)) {
			items.push({
				value: key,
				label: val
			});
		}

		items = items;
	});
</script>

<div>
	<Select
		bind:listOpen
		bind:value
		{items}
		multiple
        --border={isLight ? "solid hsl(214.3 31.8% 91.4%)" : "solid hsl(217.2 32.6% 17.5%)"}
		--input-color={isLight ? 'black' : 'white'}
		--chevron-color={isLight ? 'black' : 'white'}
		--item-color="black"
        --item-hover-color = "black"
		--multi-item-clear-icon-color={isLight ? 'black' : 'white'}
		--multi-item-color={isLight ? 'black' : 'white'}
		--multi-item-bg={isLight ? 'hsl(221.2 83.2% 53.3%)' : 'hsl(217.2 91.2% 59.8%)'}
		--multi-item-outline={isLight ? "solid hsl(214.3 31.8% 91.4%)" : "solid hsl(217.2 32.6% 17.5%)"}
		--border-radius={listOpen ? '5px 5px 0 0' : '5px'}
	/>
	<button
		class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none mt-4 "
		on:click={closeModalWithData}>Add</button>
</div>
