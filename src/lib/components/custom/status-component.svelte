<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";

    export let text: string
	export let variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | undefined
</script>

<Button variant={variant}>
	{text}
</Button>