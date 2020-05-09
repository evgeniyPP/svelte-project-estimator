import { writable } from 'svelte/store';

const key = 'materials';
const items = JSON.parse(localStorage.getItem(key) || '[]');
const materialStore = writable(items);

const add = (material, price) => {
    materialStore.update((items) => {
        const newItem = {
            id: new Date().getTime(),
            material,
            price,
        };

        return [newItem, ...items];
    });
};

materialStore.subscribe((items) => {
    localStorage.setItem(key, JSON.stringify(items));
});

export default {
    subscribe: materialStore.subscribe,
    add,
};
