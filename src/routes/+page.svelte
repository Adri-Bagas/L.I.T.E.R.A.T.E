<script lang="ts">

    import DayIMG from "$lib/img/index/index-day.jpg"
    import NightIMG from "$lib/img/index/index-night.jpg"
    import { mode } from "mode-watcher"
    import { ModeSwitch } from '$lib/components/custom/switch/index'
	import Button from '$lib/components/ui/button/button.svelte'

    import SquareLibrary from "lucide-svelte/icons/square-library"

    let isLight: boolean | undefined

    mode.subscribe((val) => {
        isLight = val != "dark" ? true : false
    })


</script>

<svelte:head>
    <title>L.I.T.E.R.A.T.E</title> 
</svelte:head>

<div class="fixed hidden flex-col md:flex w-screen bg-background">
    <div class="border-b">
        <div class="flex h-16 items-center px-4">
            <div class="mb-2 text-lg font-semibold tracking-tight flex items-stretch"><SquareLibrary size={48} /><h2 style="align-self: end;">L.I.T.E.R.A.T.E</h2></div>
            <div class="ml-auto flex items-center space-x-4">
                <Button href="/login">
                    Login
                </Button>           
                <ModeSwitch />
            </div>
        </div>
    </div>
</div>


<div class="h-screen overflow-auto flex items-center justify-center">
    <div class="w-1/2">
        <div class="mb-2 text-lg font-semibold tracking-tight">L.I.T.E.R.A.T.E</div>
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <span class="text-primary">L</span>ibrary <span class="text-primary">I</span>nterface for <span class="text-primary">T</span>apping into <span class="text-primary">E</span>very <span class="text-primary">R</span>ealm of <span class="text-primary">A</span>wesome <span class="text-primary">T</span>extual <span class="text-primary">E</span>xperiences<span class="text-primary">.</span>
        </h1>
    </div>

    {#if !isLight}
    <img src={NightIMG} alt="book" class="w-1/4 h-3/4 bg-background object-cover object-top">
    {:else}
    <img src={DayIMG} alt="book" class="w-1/4 h-3/4 bg-background object-cover object-top">
    {/if}
</div>