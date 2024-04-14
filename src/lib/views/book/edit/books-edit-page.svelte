<script lang="ts">
	import BooksForm from "$lib/components/forms/books/books-form.svelte";
    import * as Card from "$lib/components/ui/card"

    export let datas: any
</script>

<div class="h-screen overflow-auto">
    <div class="hidden flex-col md:flex pb-12">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Books | Edit</h2>
            </div>
            <Card.Root>
                <Card.Content class="mx-auto py-10 shadow-2xl">
                    <BooksForm data={datas.form} books={datas.book} authors={datas.authors} publishers={datas.publishers} t={datas.token} categories={datas.categories}/>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</div>