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
	import { Button } from '$lib/components/ui/button';
	import AddedBookTable from './added-book-table.svelte';
	import WaitingSomething from '$lib/scripts/stores/waiting-something';
	import { goto } from '$app/navigation';
	import SearchTransactionModal from './search-transaction-modal.svelte';
	import { Search } from 'lucide-svelte';
	import { formReturnSchema, type FormReturnSchema } from './schema';
	import Loan from '$lib/scripts/controllers/transactions/loan';
	import { FinePenalty, ReturningTable } from '$lib/scripts/stores/return-table';
	import { onMount } from 'svelte';
	import ReturnTransactions from '$lib/scripts/controllers/transactions/return';

	export let data: SuperValidated<Infer<FormReturnSchema>>;
	export let transactions: any;
	export let t: any;

	let books: BookDetails[];

	let showPublisherModal = false;

	const form = superForm(data, {
		validators: zodClient(formReturnSchema),
		onError(event) {
			let msg = JSON.parse(event.result.error.message);
			toast.error(msg);
		}
	});

	function closeModal() {
		showPublisherModal = false;
	}

	function handleModalClose(event: any) {
		let modalData = event.detail;

		if (modalData) {
			if (showPublisherModal) {
				$formData.transaction_id = parseInt(modalData.value);
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

	ReturningTable.subscribe((v) => {
		let datas = new Map();

		v.forEach((elem) => {
			datas.set(elem.id, {
				condition: elem.condition,
				status: elem.status
			});
		});

		$formData.books_qty = datas;
	});

	FinePenalty.subscribe((v) => {
		$formData.penalty = eval(v.join('+')) ?? 0
	})

	async function stupidlyHandlingSubmit(e: any) {
		if ($formData.books_qty.size < 1) {
			toast.error('No book selected yet!');
			return;
		}

		WaitingSomething.set(true);
		let datas = await ReturnTransactions.store(t, $formData);
		WaitingSomething.set(false);
		if (datas.success == true) {
			goto('/dashboard/transaction/loan');
		}
	}

	function openModal(whichOne: string) {
		switch (whichOne) {
			case 'publisher':
				showPublisherModal = true;
				break;
			default:
				break;
		}
	}

	async function getDetailBooksOfTrans(id:number|undefined) {

		$FinePenalty = []
		$ReturningTable = []
		WaitingSomething.set(true);
		let datas = await Loan.find(t, id!);
		WaitingSomething.set(false);
		if (datas.success == true) {
			books = datas.data.books

			let stringsDate: string = datas.data.expected_return_date

			const date1 = new Date(stringsDate);
			const date2 = new Date();

			if(date1 < date2){
				$FinePenalty.push(10000)

				$FinePenalty = $FinePenalty
			}

			$formData.member_id = datas.member_id

			ReturningTable.set(books)
		}
	}

	onMount(() => {
		$FinePenalty = []
		value = today(getLocalTimeZone())
		$formData.date = value.toString();
	})

	$: selectedMember = {
		label: transactions[$formData.transaction_id],
		value: $formData.transaction_id
	};
</script>

<form
	class="flex flex-col gap-6"
	use:enhance
	method="POST"
	on:submit|preventDefault={stupidlyHandlingSubmit}
>
	<div class="flex w-full flex-col">
		<div class="flex w-full gap-x-8">
			<Form.Field {form} name="date" class="w-1/2">
				<Form.Control let:attrs>
					<Form.Label class="mb-3">Day of transaction*</Form.Label>
					<div>
						<Popover.Root>
							<Popover.Trigger
								{...attrs}
								class={cn(
									buttonVariants({ variant: 'outline' }),
									'w-full justify-start pl-4 text-left font-normal',
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
									minValue={today(getLocalTimeZone())}
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
			<Form.Field {form} name="detail" class="w-1/2">
				<Form.Control let:attrs>
					<Form.Label>Detail*</Form.Label>
					<Input {...attrs} bind:value={$formData.detail} />
				</Form.Control>
				<Form.FieldErrors />
				<Form.Description>Detail or remarks of the transaction!</Form.Description>
			</Form.Field>
		</div>

		<Form.Field {form} name="detail" class="w-full">
			<Form.Control let:attrs>
				<Form.Label>Penalty</Form.Label>
				<Input {...attrs} bind:value={$formData.penalty} disabled/>
			</Form.Control>
			<Form.FieldErrors />
			<Form.Description>Penalty of the transaction! value added from book price when the book is missing and late return.</Form.Description>
		</Form.Field>

		<Form.Field {form} name="transaction_id">
			<Form.Control let:attrs>
				<Form.Label class="flex flex-row items-center justify-between"
					>Transaction Loaning*<Button
						size={'sm'}
						variant={'ghost'}
						on:click={() => openModal('publisher')}><Search size={12} /></Button
					></Form.Label
				>
				<Select.Root
					selected={selectedMember}
					onSelectedChange={(s) => {
						s && ($formData.transaction_id = s.value);
						getDetailBooksOfTrans(s?.value)
					}}
				>
					<Select.Trigger {...attrs}>
						<Select.Value />
					</Select.Trigger>
					<Select.Content>
						{#each Object.entries(transactions) as [key, value]}
							<Select.Item value={parseInt(key)} label={`${value}`} />
						{/each}
					</Select.Content>
				</Select.Root>
				<p class="text-sm text-muted-foreground">Enter the book publisher!.</p>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<div class="w-full">
			<AddedBookTable />
		</div>
	</div>

	<div class="flex w-full justify-end">
		<Form.Button class="w-[100px]">Submit</Form.Button>
	</div>
</form>

{#if showPublisherModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
	>
		<div class="w-1/3 rounded-lg border bg-primary-foreground p-8">
			<!-- Modal content -->
			<h2 class="mb-4 text-xl font-bold">Search Transaction</h2>
			<SearchTransactionModal members={transactions} on:close={handleModalClose} />
		</div>
	</div>
{/if}
