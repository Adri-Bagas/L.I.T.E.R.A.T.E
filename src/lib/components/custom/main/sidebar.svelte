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

		Contact,

		HomeIcon


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
	

			<hr class="mb-2">

			<div class="space-y-1 ml-4">
				<Button
					variant={$page.url.pathname === '/home' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/home"
				>
					<HomeIcon size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Home
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/home/collection' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/home/collection"
				>
					<Users size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						Collection
					{/if}
				</Button>
				<Button
					variant={$page.url.pathname === '/home/histories' ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href="/home/histories"
				>
					<Contact size={32} class={cn('mr-2', className)} />
					{#if size > 12}
						History
					{/if}
				</Button>
			</div>

		</div>
	</div>
</div>
