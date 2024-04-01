<script lang="ts">

    import * as Form from '$lib/components/ui/form';
    import * as Select from '$lib/components/ui/select'
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { formAuthorSchema, type FormAuthorSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { onMount } from 'svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	export let data: SuperValidated<Infer<FormAuthorSchema>>;

    export let authors: any;

	const form = superForm(data, {
		validators: zodClient(formAuthorSchema),
		onError(event) {
			let msg = JSON.parse(event.result.error.message);			
			toast.error(msg)
		},
	});

	const { form: formData, enhance } = form;

    onMount(() => {
        if(authors != null){
            $formData.name = authors.name
            $formData.desc = authors.desc
        }
    })

</script>

<form use:enhance method="POST">
    <div class="flex gap-6 p-5">
        <div class="flex flex-col w-full gap-4">
            <Form.Field {form} name="name">
                <Form.Control let:attrs>
                    <Form.Label>Name</Form.Label>
                    <Input {...attrs} bind:value={$formData.name} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="desc">
                <Form.Control let:attrs>
                    <Form.Label>Description</Form.Label>
                    <Textarea
                        {...attrs}
                        placeholder="Tell us a little bit about the authors"
                        bind:value={$formData.desc}
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>
    </div>
    <div class="flex justify-end">
        <Form.Button>Submit</Form.Button>
    </div>
</form>
