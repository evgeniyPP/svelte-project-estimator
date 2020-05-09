<script>
    import Form from './Form.svelte';
    import Table from './Table.svelte';

    let id, material, price;

    function edit(event) {
        ({ id, material, price } = event.detail);
    }
</script>

<main>
    <h1>Оценщик проекта</h1>
    <Form bind:id bind:material bind:price />
    <Table on:edit={edit} />
</main>

<style>
    main {
        flex: 1;
        align-content: center;
        justify-content: center;
        width: 80%;
        margin: 0 auto;
    }
</style>
