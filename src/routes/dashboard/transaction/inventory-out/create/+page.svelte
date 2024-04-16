<script lang="ts">
	import InventoryOutCreatePage from '$lib/views/inventory-out/create/inventory-out-create-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<InventoryOutCreatePage datas={data}/>