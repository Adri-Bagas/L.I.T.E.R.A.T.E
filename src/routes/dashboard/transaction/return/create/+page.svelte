<script lang="ts">
	import ReturnCreatePage from '$lib/views/return/create/return-create-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<ReturnCreatePage datas={data}/>