<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { formBookSchema, type FormBookSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { onMount } from 'svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import SearchAuthorsModal from './search-authors-modal.svelte';
	import { Search } from 'lucide-svelte';
	import SearchPublishersModal from './search-publishers-modal.svelte';
	import Book from '$lib/scripts/controllers/books';
	import { goto } from '$app/navigation';
	import WaitingSomething from '$lib/scripts/stores/waiting-something';
	import SearchCategoryModal from './search-category-modal.svelte';

	export let data: SuperValidated<Infer<FormBookSchema>>;
	export let books: any;
	export let authors: any;
	export let publishers: any;
	export let categories: any;
	export let t: any;

	let showAuthorModal = false;
	let showPublisherModal = false;
	let showCategoryModal = false;

	function openModal(whichOne: string) {
		switch (whichOne) {
			case 'author':
				showAuthorModal = true;
				break;
			case 'publisher':
				showPublisherModal = true;
				break;
			case 'category':
				showCategoryModal = true;
				break;
			default:
				break;
		}
	}

	function closeModal() {
		showAuthorModal = false;
		showPublisherModal = false;
		showCategoryModal = false;
	}

	function handleModalClose(event: any) {
		let modalData = event.detail;

		if (modalData) {
			if (showCategoryModal) {
				modalData.forEach((element: any) => {
					if (!$formData.category_id.includes(element.value)) {
						$formData.category_id.push(element.value);
					}
				});
				$formData.category_id = $formData.category_id;
			}

			if (showAuthorModal) {
				modalData.forEach((element: any) => {
					if (!$formData.author_id.includes(element.value)) {
						$formData.author_id.push(element.value);
					}
				});
				$formData.author_id = $formData.author_id;
			}

			if (showPublisherModal) {
				$formData.publisher_id = modalData.value;
			}
		}

		closeModal();
	}

	const form = superForm(data, {
		validators: zodClient(formBookSchema),
		onError(event) {
			let msg = JSON.parse(event.result.error.message);
			toast.error(msg);
		}
	});

	const { form: formData, enhance } = form;

	onMount(() => {
		if(books != null){
			$formData.title = books.title
			$formData.isbn = books.ISBN
			$formData.desc = books.desc
			$formData.author_id = books.authors_id
			$formData.category_id = books.categories_id
			$formData.is_enabled = books.is_enabled
			$formData.is_online = books.is_online
			$formData.lang = books.lang
			$formData.numOfPage = books.numOfPage
			$formData.price = books.price
			$formData.publisher_id = `${books.publisher_id}`
		}
	});

	async function stupidlyHandlingSubmit(e: any) {
		WaitingSomething.set(true);
		let datas
		if(books == null || books == undefined){
			datas = await Book.store(t, $formData);
		}else {
			datas = await Book.update(t, books.id ,$formData)
		}

		WaitingSomething.set(false);

		if (datas.success == true) {
			goto('/dashboard/books');
		}
	}

	$: selectedAuthors = $formData.author_id?.map((c) => ({ label: authors[c], value: c }));

	$: selectedCategories = $formData.category_id?.map((c) => ({ label: categories[c], value: c }));

	$: selectedPublisher = {
		label: publishers[$formData.publisher_id],
		value: $formData.publisher_id
	};
</script>

<form
	use:enhance
	method="POST"
	enctype="multipart/form-data"
	on:submit|preventDefault={stupidlyHandlingSubmit}
>
	<div class="flex gap-6 p-5">
		<div class="flex w-1/2 flex-col gap-4">
			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Title*</Form.Label>
					<Input {...attrs} bind:value={$formData.title} />
					<p class="text-sm text-muted-foreground">Enter the book title.</p>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="isbn">
				<Form.Control let:attrs>
					<Form.Label>ISBN*</Form.Label>
					<Input {...attrs} bind:value={$formData.isbn} />
					<p class="text-sm text-muted-foreground">Enter the book ISBN id.</p>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="lang">
				<Form.Control let:attrs>
					<Form.Label>Language*</Form.Label>
					<Input {...attrs} bind:value={$formData.lang} />
					<p class="text-sm text-muted-foreground">Enter the book language.</p>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="publisher_id">
				<Form.Control let:attrs>
					<Form.Label class="flex flex-row items-center justify-between"
						>Publishers*<Button
							size={'sm'}
							variant={'ghost'}
							on:click={() => openModal('publisher')}><Search size={12} /></Button
						></Form.Label
					>
					<Select.Root
						selected={selectedPublisher}
						onSelectedChange={(s) => {
							s && ($formData.publisher_id = s.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{#each Object.entries(publishers) as [key, value]}
								<Select.Item value={key} label={`${value}`} />
							{/each}
						</Select.Content>
					</Select.Root>
					<p class="text-sm text-muted-foreground">Enter the book publisher!.</p>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="desc">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<Textarea
						{...attrs}
						placeholder="Tell us a little bit about the book or the sypnosis!"
						bind:value={$formData.desc}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="flex w-1/2 flex-col gap-4">
			<Form.Field {form} name="price">
				<Form.Control let:attrs>
					<Form.Label>Price</Form.Label>
					<Input
						{...attrs}
						type="number"
						on:input={({ target }) => {
							const { value } = target;
							let data = parseInt(value);
							$formData.price = data;
						}}
					/>
					<p class="text-sm text-muted-foreground">
						Enter the book price, for penalty calculation!, if left blank it will be dafaulted to
						the default penalty price
					</p>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="numOfPage">
				<Form.Control let:attrs>
					<Form.Label>Number Of Page</Form.Label>
					<Input
						{...attrs}
						type="number"
						on:input={({ target }) => {
							const { value } = target;
							let data = parseInt(value);
							$formData.numOfPage = data;
						}}
					/>
					<p class="text-sm text-muted-foreground">
						Enter the book number of page! if you uploaded a file no matter your input it will be
						dafaulted to the pdf file number of pages.
					</p>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="author_id">
				<Form.Control let:attrs>
					<Form.Label class="flex flex-row items-center justify-between"
						>Authors*<Button size={'sm'} variant={'ghost'} on:click={() => openModal('author')}
							><Search size={12} /></Button
						></Form.Label
					>
					<Select.Root
						multiple
						selected={selectedAuthors}
						onSelectedChange={(s) => {
							if (s) {
								$formData.author_id = s.map((c) => c.value);
							} else {
								$formData.author_id = [];
							}
						}}
					>
						{#if $formData.author_id != null}
							{#each $formData.author_id as author}
								<input name={attrs.name} hidden value={author} />
							{/each}
						{/if}
						<Select.Trigger {...attrs}>
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{#each Object.entries(authors) as [key, value]}
								<Select.Item value={key} label={`${value}`} />
							{/each}
						</Select.Content>
					</Select.Root>
					<p class="text-sm text-muted-foreground">Enter the book authors!.</p>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="category_id">
				<Form.Control let:attrs>
					<Form.Label class="flex flex-row items-center justify-between"
						>Categories*<Button size={'sm'} variant={'ghost'} on:click={() => openModal('category')}
							><Search size={12} /></Button
						></Form.Label
					>
					<Select.Root
						multiple
						selected={selectedCategories}
						onSelectedChange={(s) => {
							if (s) {
								$formData.category_id = s.map((c) => c.value);
							} else {
								$formData.category_id = [];
							}
						}}
					>
						{#if $formData.category_id != null}
							{#each $formData.category_id as category}
								<input name={attrs.name} hidden value={category} />
							{/each}
						{/if}
						<Select.Trigger {...attrs}>
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{#each Object.entries(categories) as [key, value]}
								<Select.Item value={key} label={`${value}`} />
							{/each}
						</Select.Content>
					</Select.Root>
					<p class="text-sm text-muted-foreground">Enter the book category!.</p>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex flex-col items-start space-x-0 space-y-3 rounded-md border p-4">
				<Form.Field {form} name="is_enabled" class="flex flex-row items-start space-x-3 space-y-0">
					<Form.Control let:attrs>
						<Checkbox {...attrs} bind:checked={$formData.is_enabled} />
						<div class="space-y-1 leading-none">
							<Form.Label>Enabled</Form.Label>
							<Form.Description>This Book is available to be seen on the site.</Form.Description>
						</div>
						<input name={attrs.name} value={$formData.is_enabled} hidden />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="is_online" class="flex flex-row items-start space-x-3 space-y-0">
					<Form.Control let:attrs>
						<Checkbox {...attrs} bind:checked={$formData.is_online} />
						<div class="space-y-1 leading-none">
							<Form.Label>Online Available</Form.Label>
							<Form.Description
								>If checked the book is available for online reading session. MUST UPLOAD FILE IF
								CHECKED!</Form.Description
							>
						</div>
						<input name={attrs.name} value={$formData.is_online} hidden />
					</Form.Control>
				</Form.Field>

				{#if $formData.is_online}
				<Form.Field {form} name="files">
					<Form.Control let:attrs>
						<Form.Label>File</Form.Label>
						<input
							{...attrs}
							on:input={(e) => {
								$formData.files = e.currentTarget.files?.item(0);
								console.log($formData.files);
							}}
							type="file"
							accept="application/pdf"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex justify-end">
		<Button type="submit">Submit</Button>
	</div>
</form>

{#if showAuthorModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
	>
		<div class="w-1/3 rounded-lg border bg-primary-foreground p-8">
			<!-- Modal content -->
			<h2 class="mb-4 text-xl font-bold">Search Authors</h2>
			<SearchAuthorsModal {authors} on:close={handleModalClose} />
		</div>
	</div>
{/if}

{#if showCategoryModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
	>
		<div class="w-1/3 rounded-lg border bg-primary-foreground p-8">
			<!-- Modal content -->
			<h2 class="mb-4 text-xl font-bold">Search Categories</h2>
			<SearchCategoryModal {categories} on:close={handleModalClose} />
		</div>
	</div>
{/if}

{#if showPublisherModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
	>
		<div class="w-1/3 rounded-lg border bg-primary-foreground p-8">
			<!-- Modal content -->
			<h2 class="mb-4 text-xl font-bold">Search Publisher</h2>
			<SearchPublishersModal {publishers} on:close={handleModalClose} />
		</div>
	</div>
{/if}
