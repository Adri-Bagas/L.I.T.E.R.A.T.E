<script lang="ts">
	import InventoryInCreatePage from '$lib/views/inventory-in/create/inventory-in-create-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<InventoryInCreatePage datas={data}/>