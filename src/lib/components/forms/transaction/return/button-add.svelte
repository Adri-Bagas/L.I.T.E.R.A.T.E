<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { Plus } from "lucide-svelte";
    import { LoanAdded, LoanSelection } from '$lib/scripts/stores/loan-table';


    export let book: BookDetails;

    function addBookDataToStores(bookToRemove: BookDetails) {

        LoanAdded.update((destinationBooks) => {
            return [...destinationBooks, bookToRemove];
        });

        LoanSelection.update((currentBooks) => {
            return currentBooks.filter(bookI => bookI.id !== bookToRemove.id);
        });
    } 

</script>

<Button size={"sm"} on:click={() => {addBookDataToStores(book)}}>
    <Plus size={14}/>
</Button>