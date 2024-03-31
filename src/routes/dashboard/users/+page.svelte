<script lang=ts"">
	import UsersPage from '$lib/views/user/users-page.svelte';

    export let data
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<UsersPage users={data.users}/>