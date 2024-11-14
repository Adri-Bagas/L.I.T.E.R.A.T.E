<script lang="ts">
	import ShowBookPage from "$lib/views/book/show/show-book-page.svelte";

    export let data;
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<ShowBookPage book={data.book}/> 