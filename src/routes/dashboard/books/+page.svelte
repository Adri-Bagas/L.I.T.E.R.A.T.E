<script lang="ts">
	import BooksPage from '$lib/views/book/books-page.svelte';

	

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<BooksPage books={data.books}/>