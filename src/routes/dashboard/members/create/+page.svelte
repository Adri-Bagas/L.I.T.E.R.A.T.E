<script lang="ts">
	import MembersCreatePage from "$lib/views/member/create/members-create-page.svelte";
    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<MembersCreatePage datas={data}/>