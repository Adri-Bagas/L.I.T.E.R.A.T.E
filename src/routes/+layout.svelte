<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/components/ui/sonner";
	import LoadingScreen from '$lib/components/loading-screen.svelte';
	import { navigating } from '$app/stores';
	import WaitingSomething from "$lib/scripts/stores/waiting-something";

	let waiting = false

	WaitingSomething.subscribe((val) => {
		waiting = val
	})

</script>

<ModeWatcher />
<Toaster position="bottom-right"/>

{#if $navigating || waiting}
<LoadingScreen />
{/if}



<slot />
