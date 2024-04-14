<script lang=ts"">
	import CategoriesEditPage from '$lib/views/categories/edit/categories-edit-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<CategoriesEditPage datas={data} />