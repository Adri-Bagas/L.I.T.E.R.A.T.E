<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import DataTable from './data-table.svelte';
    import CONFIG from '$lib/config/config';

    export let book: Book;

    let bookCover:string = `${CONFIG.mediaUrl}/${book.media_loc}/image-00000.jpg`
</script>


<div class="h-screen overflow-auto">
    <div class="flex-col md:flex pb-12">
        <div class="flex-1 space-y-4 p-8 pt-6 mb-24">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Detail {book.title}</h2>
            </div>
            <Card.Root>
                <Card.Header/>
                <Card.Content>
                    <div class="flex gap-x-12">
                        {#if book.media_loc == null}
                        <Skeleton class="h-[28rem] w-[20rem] rounded-lg" />
                        {:else}
                        <img class="h-[28rem] w-[20rem] rounded-lg" alt="buku" src={bookCover}/>
                        {/if}
                        <div class="flex flex-grow">
                            <div class="flex flex-col flex-grow gap-y-3">
                                <div>
                                    <p class="font-semibold text-xl">
                                        Title :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {book.title}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        ISBN :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {book.ISBN}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Lang :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {book.lang}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Number Of Pages :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {book.num_of_pages}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Price :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {book.price}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Publisher :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {book.publisher}
                                    </p>
                                </div>
                            </div>  
                            <div class="flex flex-col gap-y-3 flex-grow">
                                <div>
                                    <p class="font-semibold text-xl">
                                        Authors :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {book.authors.join(', ')}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Categories :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {book.categories.join(', ')}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Description :
                                    </p>
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
                <Card.Header/>
                <Card.Content>
                    <DataTable books={book.books}/>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</div>


