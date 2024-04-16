import { writable } from 'svelte/store';

let booksEmpty:BookDetails[] = []

export const LoanSelection = writable(booksEmpty); 
export const LoanAdded = writable(booksEmpty); 

LoanAdded.subscribe((val) => {
    console.log(val)
})
