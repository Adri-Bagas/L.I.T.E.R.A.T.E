<script lang="ts">
	import LoanPage from '$lib/views/loan/loan-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<LoanPage transaction={data.transactions}/>