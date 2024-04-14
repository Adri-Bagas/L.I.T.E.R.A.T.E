<script lang="ts">
	import { BooksCreatePage } from '$lib/views/book/index.js';


    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<BooksCreatePage datas={data}/>