<script>
    import { createEventDispatcher } from 'svelte';
    import materialStore from './material.store.js';

    const dispatch = createEventDispatcher();
    let materials = [];

    $: total = materials.reduce((acc, curr) => {
        acc += curr.price;
        return acc;
    }, 0);

    materialStore.subscribe(items => {
        materials = items;
    });

    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
    });

    function edit(id, material, price) {
        dispatch('edit', { id, material, price });
    }
</script>

<table class="primary">
    <thead>
        <tr>
            <th>Материал</th>
            <th>Стоимость</th>
            <th />
        </tr>
    </thead>
    <tbody>
        {#each materials as item (item.id)}
            <tr
                on:click={edit(item.id, item.material, item.price)}
                class="pointable">
                <td>{item.material}</td>
                <td>{formatter.format(item.price)}</td>
                <td>
                    <i class="far fa-trash-alt" />
                </td>
            </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th>Итого:</th>
            <th colspan="2">{formatter.format(total)}</th>
        </tr>
    </tfoot>
</table>

<style>
    table {
        width: 100%;
    }

    .pointable {
        cursor: pointer;
    }
</style>
