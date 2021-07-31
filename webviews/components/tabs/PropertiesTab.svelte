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

    function addProperty() {
        dispatch("message", {
            type: "addProperty",
        });
    }

    function removeProperty(propId) {
        dispatch("message", {
            type: "removeProperty",
            propertyId: propId,
        });
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
            <button on:click={() => removeProperty(row.id)}> Delete </button>
        </tr>
    {/each}

    <tr class="new">
        <td contenteditable="true" bind:innerHTML={newRow.name} />
        <td contenteditable="true" bind:innerHTML={newRow.description} />
        <button on:click={() => addProperty()}> add </button>
    </tr>
</table>
