<script lang="ts">
	import LoanCreatePage from '$lib/views/loan/create/loan-create-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<LoanCreatePage datas={data}/>