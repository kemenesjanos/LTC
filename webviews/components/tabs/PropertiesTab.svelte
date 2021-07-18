<script>
    import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";

    import { fade } from "svelte/transition";
    import ClassTab from "./ClassTab.svelte";

    export let data;
    let columns = ["Name", "Description"];
    let properties = [];

    onMount( () => {
        data.properties.forEach((element) => {
            properties = [...properties, [element.name, element.description, element.id]];
        });
    });

    const dispatch = createEventDispatcher();

    function dataUpdated() {
        dispatch("message", {
            type: "update",
        });
    }

    function addRow() {
        properties = [...properties, [...newRow]];
        newRow = columns;
    }

    function deleteRow(rowToBeDeleted) {
        properties = properties.filter((row) => row != rowToBeDeleted);
    }

    let newRow = [...columns];
</script>

<div>
    <div>Properties</div>
</div>

<table>
    <tr>
        {#each columns as column}
            <th>{column}</th>
        {/each}
    </tr>

    {#each properties as row}
        <tr>
            {#each row as cell}
                <td contenteditable="true" bind:innerHTML={cell} />
            {/each}
            <button on:click={() => deleteRow(row)}> Delete </button>
        </tr>
    {/each}

    <tr class="new">
        {#each newRow as column}
            <td contenteditable="true" bind:innerHTML={column} />
        {/each}
        <button on:click={addRow}> add </button>
    </tr>
</table>
