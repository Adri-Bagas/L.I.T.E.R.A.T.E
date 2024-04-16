<script lang="ts">
	import InventoryInForm from "$lib/components/forms/transaction/inventory-in/inventory-in-form.svelte";
    import * as Card from "$lib/components/ui/card"

    export let datas: any
</script>

<div class="h-screen overflow-auto">
    <div class="hidden flex-col md:flex pb-12">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Inventory In | Create</h2>
            </div>
            <Card.Root>
                <Card.Content class="mx-auto py-10 shadow-2xl">
                    <InventoryInForm data={datas.form} books={datas.books} t={datas.to}/>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</div>