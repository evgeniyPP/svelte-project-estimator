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

const edit = (id, material, price) => {
    materialStore.update((items) => {
        const item = items.find((item) => item.id === id);

        item.material = material;
        item.price = price;

        return items;
    });
};

const remove = (id) => {
    materialStore.update((items) => items.filter((item) => item.id !== id));
};

materialStore.subscribe((items) => {
    localStorage.setItem(key, JSON.stringify(items));
});

export default {
    subscribe: materialStore.subscribe,
    add,
    edit,
    remove,
};
