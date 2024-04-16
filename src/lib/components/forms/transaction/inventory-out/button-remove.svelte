<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { InventoryOutAdded, InventoryOutSelection } from '$lib/scripts/stores/inventory-out-table';
	import { X } from "lucide-svelte";

    export let book: BookDetails;

    function addBookDataToStores(bookToRemove: BookDetails) {

        InventoryOutSelection.update((destinationBooks) => {
            return [...destinationBooks, bookToRemove];
        });

        InventoryOutAdded.update((currentBooks) => {
            return currentBooks.filter(bookI => bookI.id !== bookToRemove.id);
        });
    } 

</script>

<Button size={"sm"} on:click={() => {addBookDataToStores(book)}}>
    <X size={14}/>
</Button>