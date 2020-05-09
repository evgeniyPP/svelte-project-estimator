<script>
    import materialStore from './material.store.js';

    export let id;
    export let material = '';
    export let price;

    $: editMode = id != null;
    $: buttonText = editMode ? 'Изменить' : 'Добавить';

    $: canSubmit = material !== '' && price >= 0;

    function onSubmit() {
        if (!canSubmit) {
            return;
        }

        if (!editMode) {
            materialStore.add(material, price);
        }

        cancel();
    }

    function cancel() {
        material = '';
        price = undefined;
        id = undefined;
    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <fieldset>
        <label for="material">Материал</label>
        <input
            bind:value={material}
            type="text"
            id="material"
            placeholder="Дерево, краска и др." />
        <label for="price">Стоимость</label>
        <input
            bind:value={price}
            type="number"
            id="price"
            placeholder="Стоимость в рублях"
            min="0"
            step="any" />
    </fieldset>
    <button disabled={!canSubmit} class="float-right" type="submit">
        {buttonText}
    </button>

    {#if editMode}
        <button on:click={cancel} class="float-right" type="button">
            Отменить
        </button>
    {/if}
</form>

<style>
    button {
        margin-left: 20px;
    }

    button:disabled {
        cursor: not-allowed;
    }
</style>
