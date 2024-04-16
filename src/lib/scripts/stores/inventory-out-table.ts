import { writable } from 'svelte/store';

let booksEmpty:BookDetails[] = []

export const InventoryOutSelection = writable(booksEmpty); 
export const InventoryOutAdded = writable(booksEmpty); 

InventoryOutAdded.subscribe((val) => {
    console.log(val)
})
