<script>
    import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";

    import { fade } from "svelte/transition";
    import ClassTab from "./ClassTab.svelte";

    export let data;
    let columns = {name:"Name", description:"Description"};

    const dispatch = createEventDispatcher();

    function dataUpdated() {
        dispatch("message", {
            type: "update",
        });
    }

    //TODO: add data in the ts file with a message

    function addRow() {
        data.properties = [...data.properties, {name:newRow.name, description:newRow.description}];
        newRow = columns;
    }

    function deleteRow(rowToBeDeleted) {
        data.properties = data.properties.filter((row) => row != rowToBeDeleted);
    }

    let newRow = columns;
</script>

<div>
    <div>data.properties</div>
</div>

<table>
    <tr>
        <th>columns.name</th>
        <th>columns.description</th>
    </tr>

    {#each data.properties as row}
        <tr>
            <td contenteditable="true" bind:innerHTML={row.name} />
            <td contenteditable="true" bind:innerHTML={row.description} />
            <button on:click={() => deleteRow(row)}> Delete </button>
        </tr>
    {/each}

    <tr class="new">
        <td contenteditable="true" bind:innerHTML={newRow.name} />
        <td contenteditable="true" bind:innerHTML={newRow.description} />
        <button on:click={addRow}> add </button>
    </tr>
</table>
