import { writable } from 'svelte/store';

const WaitingSomething = writable(false);

export default WaitingSomething