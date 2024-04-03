<script lang=ts"">
	import PublishersPage from '$lib/views/publisher/publishers-page.svelte';

	

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<PublishersPage publisher={data.publishers}/>