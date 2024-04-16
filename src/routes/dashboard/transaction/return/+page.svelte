<script lang="ts">
	import InventoryInPage from '$lib/views/inventory-in/inventory-in-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<InventoryInPage transaction={data.transactions}/>