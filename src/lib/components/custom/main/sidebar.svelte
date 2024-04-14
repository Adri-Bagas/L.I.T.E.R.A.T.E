<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index';
	import { SidebarSize } from '$lib/scripts/stores/sidebar-size';

	import { page } from '$app/stores';
	import {
		DraftingCompass,
		SquareLibrary,
		Users,
		BookCopy,
		PenTool,
		Rss,
		LayoutDashboard
	} from 'lucide-svelte';

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
			<h2 class="mb-2 flex items-center text-lg font-semibold tracking-tight">
				<SquareLibrary size={48} class={cn('mb-4', className)} />
				{#if size > 12}L.I.T.E.R.A.T.E{/if}
			</h2>
			<div class="space-y-1">
				<Button
					variant={$page.url.pathname === '/dashboard' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard"
				>
					<LayoutDashboard size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Dashboard
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/dashboard/users' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/users"
				>
					<Users size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Users
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/dashboard/books' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/books"
				>
					<BookCopy size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Books
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/dashboard/authors' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/authors"
				>
					<PenTool size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Authors
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/dashboard/publishers' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/publishers"
				>
					<Rss size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Publishers
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/dashboard/categories' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/categories"
				>
					<DraftingCompass size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Categories
					{/if}
				</Button>
			</div>
		</div>
	</div>
</div>
