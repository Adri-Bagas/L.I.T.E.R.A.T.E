<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
</script>

<div class="h-screen overflow-auto">
	<div class="hidden flex-col pb-12 md:flex">
		<div class="flex-1 space-y-4 p-8 pt-6 mb-32">
			<div class="flex items-center justify-between space-y-2">
				<h2 class="text-4xl font-bold tracking-tight"><Skeleton class="h-14 w-96 rounded-lg" /></h2>
			</div>

            <div class="flex items-center justify-between space-y-2">
				<h2 class="text-2xl font-bold tracking-tight ml-10"><Skeleton class="h-12 w-96 rounded-lg" /></h2>
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
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                    </Carousel.Content>
                    <Carousel.Previous />
                    <Carousel.Next />
                </Carousel.Root>
            </div>

            <div class="flex items-center justify-between space-y-2">
				<h2 class="text-2xl font-bold tracking-tight ml-10"><Skeleton class="h-12 w-96 rounded-lg" /></h2>
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
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                        <Carousel.Item class="md:basis-1/2 lg:basis-1/4">
                            <Skeleton class="h-[24rem] w-[16rem] rounded-lg" />
                        </Carousel.Item>
                    </Carousel.Content>
                    <Carousel.Previous />
                    <Carousel.Next />
                </Carousel.Root>
            </div>
			
		</div>
	</div>
</div>
