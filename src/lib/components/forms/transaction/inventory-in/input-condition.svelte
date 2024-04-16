<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { InventoryInAdded } from '$lib/scripts/stores/inventory-in-table';
	export let book: Book;

    let value:any

	const conditions = [
		{ value: 0, label: 'Mint' },
		{ value: 1, label: 'Fine' },
		{ value: 2, label: 'Good' },
		{ value: 3, label: 'Fair' },
		{ value: 4, label: 'Poor' }
	];

    function onValueChange(v:any) {
        InventoryInAdded.update((n) => {
            const index = n.findIndex(books => books.id == book.id)

            if(index === -1){
                value = null
                return n
            }

            let updatedBook = n[index]

            updatedBook.condition = parseInt(v.value)

            const updatedDestinationBooks = [
                ...n.slice(0, index),
                updatedBook,
                ...n.slice(index + 1)
            ];

            return updatedDestinationBooks;
        })
    }

</script>

<Select.Root
    selected={value}
    onSelectedChange = {
        (v) => {
            onValueChange(v);
        }
    }
>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Select a condition" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each conditions as condition}
				<Select.Item value={condition.value} label={condition.label}>{condition.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
