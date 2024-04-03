<script lang=ts"">
	import AuthorsCreatePage from '$lib/views/author/create/authors-create-page.svelte';
    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<AuthorsCreatePage datas={data}/>