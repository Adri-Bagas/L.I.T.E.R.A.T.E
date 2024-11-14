<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import DataTable from './data-table.svelte';
	import CONFIG from '$lib/config/config';
    import { CircleUser } from "lucide-svelte";

	export let book: Book;

	let bookCover: string = `${CONFIG.mediaUrl}/${book.media_loc}/image-00000.jpg`;
</script>

<div class="h-screen overflow-auto">
	<div class="flex-col pb-12 md:flex">
		<div class="mb-24 flex-1 space-y-4 p-8 pt-6">
			<div class="flex items-center justify-between space-y-2">
				<h2 class="text-3xl font-bold tracking-tight">Detail {book.title}</h2>
			</div>
			<Card.Root>
				<Card.Header />
				<Card.Content>
					<div class="flex gap-x-12">
						{#if book.media_loc == null}
							<Skeleton class="h-[28rem] w-[20rem] rounded-lg" />
						{:else}
							<img class="h-[28rem] w-[20rem] rounded-lg" alt="buku" src={bookCover} />
						{/if}
						<div class="flex flex-grow">
							<div class="flex flex-grow flex-col gap-y-3">
								<div>
									<p class="text-xl font-semibold">Title :</p>
									<p class="text-2xl font-bold">
										{book.title}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">ISBN :</p>
									<p class="text-2xl font-bold">
										{book.ISBN}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Lang :</p>
									<p class="text-2xl font-bold">
										{book.lang}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Number Of Pages :</p>
									<p class="text-2xl font-bold">
										{book.num_of_pages}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Price :</p>
									<p class="text-2xl font-bold">
										{book.price}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Publisher :</p>
									<p class="text-2xl font-bold">
										{book.publisher}
									</p>
								</div>
							</div>
							<div class="flex flex-grow flex-col gap-y-3">
								<div>
									<p class="text-xl font-semibold">Authors :</p>
									<p class="text-2xl font-bold">
										{book.authors.join(', ')}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Categories :</p>
									<p class="text-2xl font-bold">
										{book.categories.join(', ')}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Description :</p>
									<Textarea class="flex-grow" rows={12} value={book.desc} disabled>
										{book.desc}
									</Textarea>
								</div>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<div class="flex items-center justify-between space-y-2">
				<h2 class="text-3xl font-bold tracking-tight">Books Selection</h2>
			</div>

			<Card.Root>
				<Card.Header />
				<Card.Content>
					<DataTable books={book.books} isAvailOnline={book.is_online} />
				</Card.Content>
			</Card.Root>

            {#if book.reviews.avg != null}
			<div class="flex items-center justify-between space-y-2">
				<h2 class="text-3xl font-bold tracking-tight">Ratings | {book.reviews.avg}</h2>
			</div>

			<Card.Root>
				<Card.Header />
				<Card.Content>
					{#each book.reviews.reviews as review}
						<Card.Root>
							<Card.Header>
                                <div class="flex items-center gap-4">
                                    <CircleUser size={48}/>
                                    <h3 class="text-2xl font-semibold">
                                        {review.member_name} - {review.rating}
                                    </h3>
                                </div>
                                
                            </Card.Header>
							<Card.Content><p class="text-xl font-semibold">{review.review}</p></Card.Content>
						</Card.Root>
					{/each}
				</Card.Content>
			</Card.Root>
            {/if}
		</div>
	</div>
</div>
