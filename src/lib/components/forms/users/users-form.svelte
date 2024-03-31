<script lang="ts">

    import * as Form from '$lib/components/ui/form';
    import * as Select from '$lib/components/ui/select'
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { formUserSchema, roles, type FormUserSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormUserSchema>>;

	const form = superForm(data, {
		validators: zodClient(formUserSchema),
		onError(event) {
			let msg = JSON.parse(event.result.error.message);			
			toast.error(msg)
		},
	});

	const { form: formData, enhance } = form;

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
            <Form.Field {form} name="role">
                <Form.Control let:attrs>
                    <Form.Label>Label</Form.Label>
                    <Select.Root>
                        <Select.Input name={attrs.name} />
                        <Select.Trigger {...attrs}>
                            <Select.Value placeholder="Select a role" />
                        </Select.Trigger>
                        <Select.Content>
                            {#each Object.entries(roles) as [value, label]}
                                <Select.Item {value} {label} />
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </Form.Control>
            </Form.Field>
        </div>
    </div>
    <div class="flex justify-end">
        <Form.Button>Submit</Form.Button>
    </div>
</form>
