<script lang="ts">

    import * as Form from '$lib/components/ui/form';
    import * as Select from '$lib/components/ui/select'
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { formMemberSchema, type FormMemberSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { onMount } from 'svelte';
	export let data: SuperValidated<Infer<FormMemberSchema>>;

    export let user: any;

	const form = superForm(data, {
		validators: zodClient(formMemberSchema),
		onError(event) {
			let msg = JSON.parse(event.result.error.message);			
			toast.error(msg)
		},
	});

	const { form: formData, enhance } = form;

    onMount(() => {
        if(user != null){
            $formData.email = user.email
            $formData.username = user.username
        }
    })

</script>

<form use:enhance method="POST">
    <div class="flex gap-6 p-5">
        <div class="flex flex-col w-1/2 gap-4">
            <Form.Field {form} name="username">
                <Form.Control let:attrs>
                    <Form.Label>Username</Form.Label>
                    <Input {...attrs} bind:value={$formData.username} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="full_name">
                <Form.Control let:attrs>
                    <Form.Label>Full name</Form.Label>
                    <Input {...attrs} bind:value={$formData.full_name} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="email">
                <Form.Control let:attrs>
                    <Form.Label>Email</Form.Label>
                    <Input {...attrs} bind:value={$formData.email} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>
        <div class="flex flex-col w-1/2 gap-4">
            <Form.Field {form} name="password">
                <Form.Control let:attrs>
                    <Form.Label>Password</Form.Label>
                    <Input {...attrs} type="password" bind:value={$formData.password} />
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
            <Form.Field {form} name="address">
                <Form.Control let:attrs>
                    <Form.Label>Address</Form.Label>
                    <Input {...attrs} bind:value={$formData.address} />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>
    </div>
    
    <div class="flex justify-center">
        <Form.Button class="w-5/6 m-auto">Submit</Form.Button>
    </div>

</form>
