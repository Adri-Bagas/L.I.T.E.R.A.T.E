<script lang="ts">
    
    import DayIMG from "$lib/img/auth/auth-day.jpg"
    import NightIMG from "$lib/img/auth/auth-night.jpg"
    import { mode } from "mode-watcher"
    import SquareLibrary from "lucide-svelte/icons/square-library"
    import MembersForm from "$lib/components/forms/members/members-form.svelte";


    let isLight: boolean | undefined

    mode.subscribe((val) => {
        isLight = val != "dark" ? true : false
    })
    
    export let data

    function reqForPass() {
        console.log("test")
    }
</script>

<svelte:head>
    <title>{data.title}</title> 
</svelte:head>


<div class="h-screen overflow-auto flex items-center justify-center">
    <div class="w-1/2">
        {#if !isLight}
            <img src={NightIMG} alt="book" class="w-1/3 h-screen bg-background object-cover object-top top-0 left-0 absolute brightness-50"/>
        {:else}
            <img src={DayIMG} alt="book" class="w-1/3 h-screen bg-background object-cover object-right top-0 left-0 absolute brightness-50"/>
        {/if}

        <div class="mb-2 text-lg font-semibold tracking-tight flex items-stretch z-10 absolute top-4 left-4 text-white"><SquareLibrary size={48} /><h2 style="align-self: end;">L.I.T.E.R.A.T.E</h2></div>
        <div class="w-1/5 text-lg font-semibold tracking-tight flex items-stretch z-10 absolute bottom-14 left-4 italic text-white"><h2>"{data.quote}"</h2></div>
        <div class="w-1/5 text-lg font-semibold tracking-tight flex items-stretch z-10 absolute bottom-8 left-4 italic text-white"><h2>- {data.author}</h2></div>
    </div>
    <div class="h-full w-4/5 flex justify-center items-center">
        <div class="h-[600px] w-3/4 border flex flex-col items-center border-blue-500 shadow-2xl py-6 rounded-2xl justify-center">
            <h1 class="text-5xl font-bold">
                Register
            </h1>

            <div class="w-5/6 flex flex-col gap-y-4 mb-6">
                <MembersForm data={data.form} user={null}/>
            </div>

            <div>
                <a on:click|preventDefault={reqForPass} href="/login" class="hover:text-blue-500">Have an account ?</a>
            </div>

            
        </div>
    </div>  
</div>