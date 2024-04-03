<script lang=ts"">
	import PublishersEditPage from '$lib/views/publisher/edit/publishers-edit-page.svelte';
    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<PublishersEditPage datas={data} />