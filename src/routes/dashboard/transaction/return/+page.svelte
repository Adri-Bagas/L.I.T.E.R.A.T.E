<script lang="ts">
	import ReturnPage from '$lib/views/return/return-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<ReturnPage transaction={data.transactions}/> 