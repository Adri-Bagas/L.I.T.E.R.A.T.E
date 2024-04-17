<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import ButtonRemove from './button-remove.svelte';
	import { addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { ReturningTable } from '$lib/scripts/stores/return-table';
	import InputCondition from './input-condition.svelte';
	import InputStatus from './input-status.svelte';

	const tableSelection = createTable(ReturningTable, {
		page: addPagination({
            initialPageSize: 5
        }),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columnsSelection = tableSelection.createColumns([
		tableSelection.column({
			accessor: 'sn',
			header: 'Serial Number'
		}),
		tableSelection.column({
			accessor: 'title',
			header: 'Title'
		}),
        tableSelection.column({
			accessor: (book) => book,
			header: 'Condition',
            cell: ({ value }) => {
                return createRender(InputCondition, {book: value})
            }
		}),
        tableSelection.column({
			accessor: (book) => book,
			header: 'Status',
            cell: ({ value }) => {
                return createRender(InputStatus, {book: value})
            }
		}),
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		tableSelection.createViewModel(columnsSelection);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;

	const { filterValue } = pluginStates.filter;

</script>

<h2 class="mt-4 flex items-center text-lg font-semibold">Selected Book Table</h2>
<p class="mb-2 text-sm text-muted-foreground">Select the book and add it.</p>
<div>
    <div class="flex justify-end items-center mb-2">
        <Input
            class="max-w-64"
            placeholder="Search ..."
            type="text"
            bind:value={$filterValue}
        />
    </div>
    <div class="rounded-md border w-full">
        <Table.Root {...$tableAttrs}>
            <Table.Header>
                {#each $headerRows as headerRow}
                    <Subscribe rowAttrs={headerRow.attrs()}>
                        <Table.Row>
                            {#each headerRow.cells as cell (cell.id)}
                                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                                    <Table.Head {...attrs}>
                                        <Render of={cell.render()} />
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
        <h3>
            {$pageIndex + 1}
        </h3>
        <Button
            variant="outline"
            size="sm"
            disabled={!$hasNextPage}
            on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
        >
    </div>
</div>