import { writable } from 'svelte/store';

let booksEmpty:Book[] = []

export const InventoryInSelection = writable(booksEmpty); 
export const InventoryInAdded = writable(booksEmpty); 

InventoryInAdded.subscribe((val) => {
    console.log(val)
})
