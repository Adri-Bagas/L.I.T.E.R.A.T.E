<script lang="ts">
	import MembersPage from '$lib/views/member/members-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<MembersPage members={data.members} deleted={data.members}/>