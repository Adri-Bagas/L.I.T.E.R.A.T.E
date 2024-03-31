<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/components/ui/sonner";
	import LoadingScreen from '$lib/components/loading-screen.svelte';
	import { navigating } from '$app/stores';
</script>

<ModeWatcher />
<Toaster position="bottom-right"/>

{#if $navigating}
<LoadingScreen />
{/if}



<slot />
