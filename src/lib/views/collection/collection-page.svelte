<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { onMount } from 'svelte';
    import CONFIG from '$lib/config/config';

    export let datas: BookSmallView[]
    export let datasReaded: BookSmallView[]

    onMount(() => {console.log(datas)})

</script>

<div class="h-screen overflow-auto">
	<div class="hidden flex-col pb-12 md:flex">
		<div class="flex-1 space-y-4 p-8 pt-6 mb-32">
			<div class="flex items-center justify-between space-y-2">
				<h2 class="text-4xl font-bold tracking-tight">Collection and Current Reading Lists</h2>
			</div>

            {#if datasReaded.length > 0}
            <div class="flex items-center justify-between space-y-2">
				<h2 class="text-2xl font-bold tracking-tight ml-10">Continue Reading</h2>
			</div>

            <hr class="mx-6">

			<!-- 50% on small screens and 33% on larger screens. -->
            <div class="mx-16">
                <Carousel.Root
                opts={{
                    align: "start",
                    loop: true,
                }}>
                    <Carousel.Content>
                        {#each datasReaded as book}
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            
                            <div class="h-[24rem] w-[16rem] shadow-xl">
                                <a class="block" href={`/book/view/${book.book_detail_id}`}>
                                    <div class="z-20 h-[24rem] w-[16rem] absolute bg-black flex items-center justify-center rounded-lg opacity-0 hover:opacity-75 dark:opacity-5 dark:hover:opacity-75 transition-all duration-300">
                                        <p class="text-white text-lg font-bold mx-8 text-center">{book.title}</p>
                                    </div>
                                    <img class="h-[24rem] w-[16rem] rounded-lg" alt="buku" src={`${CONFIG.mediaUrl}/${book.media_loc}/image-00000.jpg`}/>
                                </a>
                            </div>
                        </Carousel.Item>
                        {/each}
                    </Carousel.Content>
                    <Carousel.Previous />
                    <Carousel.Next />
                </Carousel.Root>
            </div>
            {/if}

            <div class="flex items-center justify-between space-y-2">
				<h2 class="text-2xl font-bold tracking-tight ml-10">Your Collection!</h2>
			</div>

            <hr class="mx-6">

			<!-- 50% on small screens and 33% on larger screens. -->
            <div class="mx-16">
                <div class="flex w-full flex-wrap gap-9 relative overflow-auto h-full">
                    {#each datas as book}
                    <div>
                        <div class="h-[24rem] w-[16rem] shadow-xl">
                            <a class="block" href={`home/book/${book.id}`}>
                                <div class="z-20 h-[24rem] w-[16rem] absolute bg-black flex items-center justify-center rounded-lg opacity-0 hover:opacity-75 dark:opacity-5 dark:hover:opacity-75 transition-all duration-300">
                                    <p class="text-white text-lg font-bold mx-8 text-center">{book.title}</p>
                                </div>
                                <img class="h-[24rem] w-[16rem] rounded-lg absolute" alt="buku" src={`${CONFIG.mediaUrl}/${book.media_loc}/image-00000.jpg`}/>
                            </a>
                        </div>
                    </div>
                    {/each}
                </div>
            </div>
			
		</div>
	</div>
</div>
