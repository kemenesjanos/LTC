<script>
    import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";

    import { fade } from "svelte/transition";
    import ClassTab from "./ClassTab.svelte";

    export let data;

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

</script>

<div>
    <div>data.properties</div>
</div>

<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>

    {#each data.properties as row}
        <tr>
            <td contenteditable="true" bind:innerHTML={row.name} on:input={dataUpdated} />
            <td contenteditable="true" bind:innerHTML={row.description} on:input={dataUpdated}/>
            <button on:click={() => removeProperty(row.id)}> Delete </button>
        </tr>
    {/each}

    <tr>
        <button on:click={() => addProperty()}> add </button>
    </tr>
</table>
