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
		LayoutDashboard,
		Home,
		ReceiptText,
		ArchiveRestore,
		ArchiveX,
		BookUp2,
		BookDown,

		Contact

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
			<h1 class="mb-2 flex items-center text-lg font-semibold tracking-tight">
				<SquareLibrary size={48} class={cn('mb-4', className)} />
				{#if size > 12}L.I.T.E.R.A.T.E{/if}
			</h1>
			

			<h2 class=" ml-2 flex items-center text-base font-semibold">
				<Home size={36} class={cn('mb-4', className)} />
				{#if size > 12}<span class="inline-block ml-2">Main</span>{/if}
			</h2>

			<hr class="mb-2">

			<div class="space-y-1 ml-4">
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
					variant={$page.url.pathname === '/dashboard/members' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/members"
				>
					<Contact size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Members
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


			<h2 class="mt-6 ml-2 flex items-center text-base font-semibold">
				<ReceiptText size={36} class={cn('mb-4', className)} />
				{#if size > 12}<span class="inline-block ml-2">Transaction</span>{/if}
			</h2>

			<hr class="mb-2">

			<div class="space-y-1 ml-4">
				<Button
					variant={$page.url.pathname === '/dashboard/transaction/inventory-in' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/transaction/inventory-in"
				>
					<ArchiveRestore size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Inventory In
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/dashboard/transaction/inventory-out' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/transaction/inventory-out"
				>
					<ArchiveX size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Inventory Out
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/dashboard/transaction/loan' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/transaction/loan"
				>
					<BookUp2 size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Loan
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/dashboard/transaction/return' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/dashboard/transaction/return"
				>
					<BookDown size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Return
					{/if}
				</Button>
				
			</div>
		</div>
	</div>
</div>
