<script lang="ts">
	import Book from '$lib/scripts/controllers/books.js';
	import HomePageSkeleton from '$lib/views/home/home-page-skeleton.svelte';
	import HomePage from '$lib/views/home/home-page.svelte';

	export let data

	async function getBooksAndCurrentOnlineAccessData(){
		let datas2: BookSmallView[] = await Book.getBookWithAccess(data.tok)
		let datas: BookSmallView[] = await Book.getRecomBook(data.tok)
		return {
			recommendations : datas,
			readed: datas2
		};
	}
</script>


<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

{#await getBooksAndCurrentOnlineAccessData()}
	<HomePageSkeleton />
{:then datas} 
	<HomePage datas={datas.recommendations} datasReaded={datas.readed}/>
{/await}
