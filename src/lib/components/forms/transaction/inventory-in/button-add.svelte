<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { InventoryInAdded, InventoryInSelection } from "$lib/scripts/stores/inventory-in-table";
	import { Plus } from "lucide-svelte";

    export let book: Book;

    function addBookDataToStores(bookToRemove: Book) {

        InventoryInAdded.update((destinationBooks) => {
            return [...destinationBooks, bookToRemove];
        });

        InventoryInSelection.update((currentBooks) => {
            return currentBooks.filter(bookI => bookI.id !== bookToRemove.id);
        });
    } 

</script>

<Button size={"sm"} on:click={() => {addBookDataToStores(book)}}>
    <Plus size={14}/>
</Button>