<script lang="ts">
	import { DashboardPage } from "$lib/views/dashboard/index";
	export let data
</script>


<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<DashboardPage />