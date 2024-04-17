<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { FinePenalty, ReturningTable } from '$lib/scripts/stores/return-table';
	import { onMount } from 'svelte';
	export let book: BookDetails;

	let value: any;

	let penalize = false;

	const statuses = [
		{ value: 0, label: 'Not Missing' },
		{ value: 1, label: 'Missing' }
	];

	function onValueChange(v: any) {
		ReturningTable.update((n) => {
			const index = n.findIndex((books) => books.id == book.id);

			if (index === -1) {
				value = null;
				return n;
			}

			let updatedBook = n[index];

			updatedBook.status = v.value;

			if (v.value == 1) {
				FinePenalty.update((n) => {
					if (updatedBook.price != undefined && updatedBook != null) {
						n.push(updatedBook.price!);
						return n;
					}
					n.push(10000);

					return n; // customize default
				});

				penalize = true;
			} else if (v.value == 0) {
				if (penalize) {
					FinePenalty.update((n) => {
						let valueToRemove = updatedBook.price ?? 10000;

						let indexs = n.indexOf(valueToRemove);

						if (index !== -1) {
							n.splice(indexs, 1);
						} // customize default

						return n;
					});
				}

                penalize = false;
			}

			const updatedDestinationBooks = [...n.slice(0, index), updatedBook, ...n.slice(index + 1)];

			return updatedDestinationBooks;
		});
	}
</script>

<Select.Root
	selected={value}
	onSelectedChange={(v) => {
		onValueChange(v);
	}}
>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Select a condition" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each statuses as status}
				<Select.Item value={status.value} label={status.label}>{status.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
