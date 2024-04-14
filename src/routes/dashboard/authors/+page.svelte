<script lang="ts">
	import AuthorsPage from '$lib/views/author/authors-page.svelte';
    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<AuthorsPage authors={data.author}/>