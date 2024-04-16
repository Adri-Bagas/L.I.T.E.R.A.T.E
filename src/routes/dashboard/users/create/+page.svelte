<script lang="ts">
	import { UsersCreatePage } from "$lib/views/user/index";

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<UsersCreatePage datas={data}/>