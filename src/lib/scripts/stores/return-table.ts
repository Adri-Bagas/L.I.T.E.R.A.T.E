import { writable } from 'svelte/store';

let booksEmpty:BookDetails[] = []

export const ReturningTable = writable(booksEmpty); 
export const FinePenalty = writable([0]);

ReturningTable.subscribe((val) => {
    console.log(val)
})