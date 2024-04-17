<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import CalendarIcon from 'svelte-radix/Calendar.svelte';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select';
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import ButtonAdd from './button-add.svelte';
	import { addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import AddedBookTable from './added-book-table.svelte';
	import WaitingSomething from '$lib/scripts/stores/waiting-something';
	import { goto } from '$app/navigation';
	import { LoanAdded, LoanSelection } from '$lib/scripts/stores/loan-table';
	import SearchMemberModal from './search-member-modal.svelte';
	import { Search } from 'lucide-svelte';
	import { formLoanSchema, type FormLoanSchema } from './schema';
	import Loan from '$lib/scripts/controllers/transactions/loan';

	export let data: SuperValidated<Infer<FormLoanSchema>>;

	export let books: BookDetails[];
	export let members: any;
	export let t: any;

	let showModal = false;

	const form = superForm(data, {
		validators: zodClient(formLoanSchema),
		onError(event) {
			let msg = JSON.parse(event.result.error.message);
			toast.error(msg);
		}
	});

	function closeModal() {
		showModal = false;
	}

	function handleModalClose(event: any) {
		let modalData = event.detail;

		if (modalData) {
			if (showModal) {
				$formData.member_id = parseInt(modalData.value);
			}
		}

		closeModal();
	}

	const { form: formData, enhance } = form;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value: DateValue | undefined;

	$: value = $formData.date ? parseDate($formData.date) : undefined;

	let placeholder: DateValue = today(getLocalTimeZone());

	LoanSelection.set(books);

	const tableSelection = createTable(LoanSelection, {
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
			accessor: 'condition',
			header: 'Condition'
		}),
		tableSelection.column({
			accessor: (book) => book,
			header: '',
			cell: ({ value }) => {
				return createRender(ButtonAdd, { book: value });
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		tableSelection.createViewModel(columnsSelection);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;

	const { filterValue } = pluginStates.filter;

	LoanAdded.subscribe((v) => {
		let datas: number[] = [];

		v.forEach((elem) => {
			datas.push(elem.id);
		});

		$formData.books_id = datas;
	});

	async function stupidlyHandlingSubmit(e: any) {
		if ($formData.books_id.length < 1) {
			toast.error('No book selected yet!');
			return;
		}

		WaitingSomething.set(true);
		let datas = await Loan.store(t, $formData);
		WaitingSomething.set(false);
		if (datas.success == true) {
			goto('/dashboard/transaction/loan');
		}
	}

	function openModal(whichOne: string) {
		switch (whichOne) {
			case 'publisher':
				showModal = true;
				break;
			default:
				break;
		}
	}

	$: selectedMember = {
		label: members[$formData.member_id],
		value: $formData.member_id
	};
</script>

<form
	class="flex flex-col gap-6"
	use:enhance
	method="POST"
	on:submit|preventDefault={stupidlyHandlingSubmit}
>
	<div class="flex w-full justify-between">
		<div class="flex w-5/12 flex-col">
			<Form.Field {form} name="member_id">
				<Form.Control let:attrs>
					<Form.Label class="flex flex-row items-center justify-between"
						>Member*<Button size={'sm'} variant={'ghost'} on:click={() => openModal('publisher')}
							><Search size={12} /></Button
						></Form.Label
					>
					<Select.Root
						selected={selectedMember}
						onSelectedChange={(s) => {
							s && ($formData.member_id = s.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{#each Object.entries(members) as [key, value]}
								<Select.Item value={parseInt(key)} label={`${value}`} />
							{/each}
						</Select.Content>
					</Select.Root>
					<p class="text-sm text-muted-foreground">Enter the book publisher!.</p>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex w-full gap-x-8">
				<Form.Field {form} name="date">
					<Form.Control let:attrs>
						<Form.Label class="mb-3">Day of transaction*</Form.Label>
						<div class="w-[280px]">
							<Popover.Root>
								<Popover.Trigger
									{...attrs}
									class={cn(
										buttonVariants({ variant: 'outline' }),
										'w-[280px] justify-start pl-4 text-left font-normal',
										!value && 'text-muted-foreground'
									)}
								>
									{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
									<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0" side="top">
									<Calendar
										{value}
										bind:placeholder
										minValue={new CalendarDate(1900, 1, 1)}
										maxValue={today(getLocalTimeZone())}
										calendarLabel="Date of birth"
										initialFocus
										onValueChange={(v) => {
											if (v) {
												$formData.date = v.toString();
											} else {
												$formData.date = '';
											}
										}}
									/>
								</Popover.Content>
							</Popover.Root>
						</div>
						<Form.Description>The date of the transaction!</Form.Description>
						<Form.FieldErrors />
						<input hidden value={$formData.date} name={attrs.name} />
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="detail">
					<Form.Control let:attrs>
						<Form.Label>Detail*</Form.Label>
						<Input {...attrs} bind:value={$formData.detail} />
					</Form.Control>
					<Form.FieldErrors />
					<Form.Description>Detail or remarks of the transaction!</Form.Description>
				</Form.Field>
			</div>

			<h2 class="mt-4 flex items-center text-lg font-semibold">Selection Table</h2>
			<p class="mb-2 text-sm text-muted-foreground">Select the book and add it.</p>
			<div>
				<div class="mb-2 flex items-center justify-end">
					<Input class="max-w-64" placeholder="Search ..." type="text" bind:value={$filterValue} />
				</div>
				<div class="w-full rounded-md border">
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
		</div>

		<div class="w-6/12">
			<AddedBookTable />
		</div>
	</div>

	<div class="flex w-full justify-end">
		<Form.Button class="w-[100px]">Submit</Form.Button>
	</div>
</form>

{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
	>
		<div class="w-1/3 rounded-lg border bg-primary-foreground p-8">
			<!-- Modal content -->
			<h2 class="mb-4 text-xl font-bold">Search Member</h2>
			<SearchMemberModal {members} on:close={handleModalClose} />
		</div>
	</div>
{/if}
