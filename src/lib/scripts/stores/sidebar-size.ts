import { writable } from 'svelte/store';

export const SidebarSize = writable(0); 

SidebarSize.subscribe((value) =>{
    return value
})