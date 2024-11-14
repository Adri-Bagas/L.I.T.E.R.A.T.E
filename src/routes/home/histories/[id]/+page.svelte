<script lang="ts">
	import LoanShowPage from "$lib/views/loan/show/loan-show-page.svelte";

    export let data;
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<LoanShowPage transaction={data.transaction}/> 