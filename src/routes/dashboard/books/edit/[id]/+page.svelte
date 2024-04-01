<script lang=ts"">
	import { UsersEditPage } from "$lib/views/user/index";

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<UsersEditPage datas={data} />