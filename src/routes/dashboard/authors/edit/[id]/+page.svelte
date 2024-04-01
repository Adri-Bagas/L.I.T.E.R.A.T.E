<script lang=ts"">
	import AuthorsEditPage from '$lib/views/author/edit/authors-edit-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<AuthorsEditPage datas={data} />