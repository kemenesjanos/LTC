<script>
    import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";
    import { object_without_properties } from "svelte/internal";

    import { fade } from "svelte/transition";
    import ClassTab from "./ClassTab.svelte";

    import ExpansionPanel from '../sharedComponents/ExpansionPanel.svelte';


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

    
    let group = '';

</script>

<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>

    <!-- TODO:Implement with cards -->
    {#each data.properties as row}
        <tr>
            <td>
                <input type="text" bind:value={row.name}/>
            </td>
            <td>
                <input type="text" bind:value={row.description}/>
            </td>
            <button on:click={() => removeProperty(row.id)}> Delete </button>
        </tr>
    {:else}
        <tr>There are no properties yet.</tr>
    {/each}

    <tr>
        <button on:click={() => addProperty()}> add </button>
    </tr>
</table>

<ExpansionPanel name="Panel 1" bind:group>
    <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et,
        dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus
        velit! Inventore laborum rerum at id?
    </div>
</ExpansionPanel>