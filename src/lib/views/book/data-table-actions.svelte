<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
    import Pencil from 'lucide-svelte/icons/pencil'
    import Eye from 'lucide-svelte/icons/eye'
    import Trash2 from 'lucide-svelte/icons/trash-2'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	export let id: string;

    let editRoute = `books/edit/${id}`;
	let showUrl = `books/${id}`;

    async function deletes(id: string) {

        let deleteUrl = `${window.location.origin}/dashboard/books/${id}`

        const requestOptions: RequestInit = {
			method: 'DELETE',
			redirect: 'manual'
		};

        const response = await fetch(deleteUrl, requestOptions)
        const result = await response.json();

        if(result.success){
            toast.success(result.msg)
        }else{
            toast.error(result.msg)
        }
        
        goto('/dashboard').then(
            () => goto("/dashboard/books")
        );

    }

</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item href={showUrl}>
				Show
                <DropdownMenu.Shortcut><Eye size={14}/></DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href={editRoute}>
            Edit
            <DropdownMenu.Shortcut><Pencil size={14}/></DropdownMenu.Shortcut>
        </DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => {deletes(id)}}>
            Delete
            <DropdownMenu.Shortcut><Trash2 size={14}/></DropdownMenu.Shortcut>
        </DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
