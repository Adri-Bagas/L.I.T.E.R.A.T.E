<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index';
	import DataTable from './data-table.svelte';
    import * as Card from "$lib/components/ui/card"
    import { Button } from '$lib/components/ui/button/index';
    import { Plus } from "lucide-svelte/icons";
    export let publisher:Publisher[];
    // export let deleted:Author[];
</script>

<div class="h-screen overflow-auto">
    <div class="hidden flex-col md:flex pb-12">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Authors</h2>
                <Button href="authors/create">Create <Plus size={16}/></Button>
            </div>
            <Tabs.Root value="stored" class="space-y-4">
                <Tabs.List>
                    <Tabs.Trigger value="stored">Stored</Tabs.Trigger>
                    <Tabs.Trigger value="thrashed">Thrashed</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="stored" class="space-y-4 pb-16">
                    <Card.Root>
                        <Card.Content class="mx-auto py-10 shadow-2xl">
                            <DataTable datas={publisher}/>
                        </Card.Content>
                    </Card.Root>
                </Tabs.Content> 
                <Tabs.Content value="thrashed" class="space-y-4 pb-16">
                    <Card.Root>
                        <Card.Content class="mx-auto py-10 shadow-2xl">
                            <!-- <DataTable datas={deleted}/> -->
                        </Card.Content>
                    </Card.Root>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </div>
</div>