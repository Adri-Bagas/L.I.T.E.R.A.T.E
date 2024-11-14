<script lang="ts">
	import Book from '$lib/scripts/controllers/books.js';
	import CollectionPage from '$lib/views/collection/collection-page.svelte';
	import HomePageSkeleton from '$lib/views/home/home-page-skeleton.svelte';

	export let data

	async function getBooksAndCurrentOnlineAccessData(){
		let datas2: BookSmallView[] = await Book.getBookWithAccess(data.tok)
		let datas: BookSmallView[] = await Book.getCollBook(data.tok)
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
	<CollectionPage datas={datas.recommendations} datasReaded={datas.readed}/>
{/await}
