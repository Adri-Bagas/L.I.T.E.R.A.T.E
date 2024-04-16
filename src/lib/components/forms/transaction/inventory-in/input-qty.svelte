<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import { InventoryInAdded } from "$lib/scripts/stores/inventory-in-table";

    export let book: Book;

    let value:any

    function onValueChange() {
        InventoryInAdded.update((n) => {
            const index = n.findIndex(books => books.id == book.id)

            if(index === -1){
                value = 0
                return n
            }

            let updatedBook = n[index]

            updatedBook.qty = parseInt(value)

            const updatedDestinationBooks = [
                ...n.slice(0, index),
                updatedBook,
                ...n.slice(index + 1)
            ];

            return updatedDestinationBooks
        })
    }

</script>

<Input bind:value type={"number"} class="w-16" on:change = {onValueChange}/>