<script lang=ts"">
	import PublishersCreatePage from '$lib/views/publisher/create/publishers-create-page.svelte';
    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<PublishersCreatePage datas={data}/>