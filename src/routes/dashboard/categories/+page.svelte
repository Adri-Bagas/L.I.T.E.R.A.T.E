<script lang="ts">
	import { CategoriesPage } from '$lib/views/categories/index.js';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<CategoriesPage categories={data.category}/>