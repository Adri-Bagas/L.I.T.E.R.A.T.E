<script lang="ts">
	import ShowMemberPage from "$lib/views/member/show/show-member-page.svelte";

    export let data;
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<ShowMemberPage member={data.member}/> 