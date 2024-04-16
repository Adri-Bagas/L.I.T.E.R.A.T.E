<script lang="ts">
	import InventoryOutPage from '$lib/views/inventory-out/inventory-out-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<InventoryOutPage transaction={data.transactions}/>