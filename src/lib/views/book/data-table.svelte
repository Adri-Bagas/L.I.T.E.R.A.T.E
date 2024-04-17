<script lang="ts">
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './data-table-actions.svelte';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown, Search } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import StatusComponent from '$lib/components/custom/status-component.svelte';

	export let datas: Book[];

	const table = createTable(readable(datas), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'ISBN',
			header: 'ISBN'
		}),
		table.column({
			accessor: 'title',
			header: 'Title'
		}),
		table.column({
			accessor: 'lang',
			header: 'Lang'
		}),
		table.column({
			accessor: 'num_of_pages',
			header: 'Pages'
		}),
		table.column({
			accessor: 'price',
			header: 'Price'
		}),
		table.column({
			accessor: 'stock',
			header: 'Stock'
		}),
		table.column({
			accessor: 'is_enabled',
			header: 'Enabled',
			cell: ({ value }) => {
				if(value){
					return createRender(StatusComponent, { text: "ENABLED", variant: "link" });
				}else{
					return createRender(StatusComponent, { text: "DISABLED", variant: "destructive" });
				}
			},
		}),
		table.column({
			accessor: 'is_online',
			header: 'Avail Online',
			cell: ({ value }) => {
				if(value){
					return createRender(StatusComponent, { text: "AVAIL", variant: "link" });
				}else{
					return createRender(StatusComponent, { text: "NOT AVAIL", variant: "destructive" });
				}
			},
		}),
		table.column({
			id: 'actions',
			accessor: ({ id }) => id,
			header: 'Actions',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;

	const { filterValue } = pluginStates.filter;
</script>

<div>
	<div class="flex items-center justify-end gap-4 py-4">
        <Search class="dark:text-slate-400"/>
		<Input class="w-1/6" placeholder="Search..." type="text" bind:value={$filterValue} />
	</div>

	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id === 'actions'}
											<Render of={cell.render()} />
										{:else}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
