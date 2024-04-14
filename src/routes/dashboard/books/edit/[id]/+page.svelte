<script lang=ts"">
	import { BooksEditPage } from '$lib/views/book/index.js';


    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<BooksEditPage datas={data} />