<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
    import WaitingSomething from "$lib/scripts/stores/waiting-something";

	export let id: number;

    let borrowOnline = `home/book/${id}`;

    async function borrow(id: number) {

        WaitingSomething.set(true)

        let deleteUrl = `${window.location.origin}/${borrowOnline}`

        console.log(deleteUrl)

        const requestOptions: RequestInit = {
			method: 'POST',
			redirect: 'manual'
		};

        const response = await fetch(deleteUrl, requestOptions)
        const result = await response.json();


        WaitingSomething.set(false)

        if(result.success){
            toast.success(result.msg)

			goto(`/book/view/${id}`);
        }else{
            toast.error(result.msg)
        }

        // goto('/home');

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
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => {borrow(id)}}>
            Borrow Online
        </DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
