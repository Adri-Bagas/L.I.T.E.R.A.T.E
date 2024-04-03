<script lang="ts">

    import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { formPublisherSchema, type FormPublisherSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { onMount } from 'svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	export let data: SuperValidated<Infer<FormPublisherSchema>>;

    export let publisher: any;

	const form = superForm(data, {
		validators: zodClient(formPublisherSchema),
		onError(event) {
			let msg = JSON.parse(event.result.error.message);			
			toast.error(msg)
		},
	});

	const { form: formData, enhance } = form;

    onMount(() => {
        if(publisher != null){
            $formData.name = publisher.name
            $formData.desc = publisher.desc
            $formData.address = publisher.address
            $formData.phone_number = publisher.phone_number
        }
    })

</script>

<form use:enhance method="POST">
    <div class="flex gap-6 p-5">
        <div class="flex flex-col w-1/2 gap-4">
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
        <div class="flex flex-col w-1/2 gap-4">
            <Form.Field {form} name="address">
                <Form.Control let:attrs>
                    <Form.Label>Address</Form.Label>
                    <Input {...attrs} bind:value={$formData.address} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="phone_number">
                <Form.Control let:attrs>
                    <Form.Label>Phone Number</Form.Label>
                    <Input {...attrs} bind:value={$formData.phone_number} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>
    </div>
    <div class="flex justify-end">
        <Form.Button>Submit</Form.Button>
    </div>
</form>
