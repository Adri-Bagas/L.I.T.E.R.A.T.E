<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index';
	import { SidebarSize } from '$lib/scripts/stores/sidebar-size';
    import SquareLibrary from "lucide-svelte/icons/square-library";
	import Users from "lucide-svelte/icons/users";
	import Books from "lucide-svelte/icons/book-copy";
	import Authors from "lucide-svelte/icons/pen-tool"
	import RSS from "lucide-svelte/icons/rss"
	import DashboardLayout from "lucide-svelte/icons/layout-dashboard";
	import { page } from '$app/stores';

	let size: number = 0;

	SidebarSize.subscribe((val) => {
		size = val;
	});

	let className: string | null | undefined = undefined;
	export { className as class };
</script>

<div class={cn('pb-12', className)}>
	<div class="space-y-4 py-4">
		<div class="px-3 py-2">
            <h2 class="mb-2 text-lg font-semibold tracking-tight flex items-center">  <SquareLibrary size={48} class={cn('mb-4', className)}/> {#if size > 12}L.I.T.E.R.A.T.E{/if}</h2>
			<div class="space-y-1">
				<Button variant={ $page.url.pathname === "/dashboard" ? "secondary" : "ghost"} class="w-full justify-start" href="/dashboard">
                    <DashboardLayout size={32}  class={cn('mr-2', className)}/>
					{#if size > 12}
						Dashboard
					{/if}
				</Button>
				<Button variant={ $page.url.pathname === "/dashboard/users" ? "secondary" : "ghost"} class="w-full justify-start" href="/dashboard/users">
					<Users size={32}  class={cn('mr-2', className)}/>
					{#if size > 12}
						Users
					{/if}
				</Button>
				<Button variant={ $page.url.pathname === "/dashboard/books" ? "secondary" : "ghost"} class="w-full justify-start" href="/dashboard/books">
					<Books size={32}  class={cn('mr-2', className)}/>
					{#if size > 12}
						Books
					{/if}
				</Button>
				<Button variant={ $page.url.pathname === "/dashboard/authors" ? "secondary" : "ghost"} class="w-full justify-start" href="/dashboard/authors">
					<Authors size={32}  class={cn('mr-2', className)}/>
					{#if size > 12}
						Authors
					{/if}
				</Button>
				<Button variant={ $page.url.pathname === "/dashboard/publishers" ? "secondary" : "ghost"} class="w-full justify-start" href="/dashboard/publishers">
					<RSS size={32}  class={cn('mr-2', className)}/>
					{#if size > 12}
						Publishers
					{/if}
				</Button>
			</div>
		</div>
	</div>
</div>
