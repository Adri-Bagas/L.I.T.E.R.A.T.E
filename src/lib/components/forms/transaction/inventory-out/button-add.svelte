<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
    import { InventoryOutAdded, InventoryOutSelection } from '$lib/scripts/stores/inventory-out-table';
	import { Plus } from "lucide-svelte";

    export let book: BookDetails;

    function addBookDataToStores(bookToRemove: BookDetails) {

        InventoryOutAdded.update((destinationBooks) => {
            return [...destinationBooks, bookToRemove];
        });

        InventoryOutSelection.update((currentBooks) => {
            return currentBooks.filter(bookI => bookI.id !== bookToRemove.id);
        });
    } 

</script>

<Button size={"sm"} on:click={() => {addBookDataToStores(book)}}>
    <Plus size={14}/>
</Button>