<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { X } from "lucide-svelte";
    import { LoanAdded, LoanSelection } from '$lib/scripts/stores/loan-table';


    export let book: BookDetails;

    function addBookDataToStores(bookToRemove: BookDetails) {

        LoanSelection.update((destinationBooks) => {
            return [...destinationBooks, bookToRemove];
        });

        LoanAdded.update((currentBooks) => {
            return currentBooks.filter(bookI => bookI.id !== bookToRemove.id);
        });
    } 

</script>

<Button size={"sm"} on:click={() => {addBookDataToStores(book)}}>
    <X size={14}/>
</Button>