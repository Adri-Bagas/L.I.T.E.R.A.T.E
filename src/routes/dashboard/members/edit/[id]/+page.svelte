<script lang="ts">
	import MembersEditPage from "$lib/views/member/edit/members-edit-page.svelte";

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<MembersEditPage datas={data} />