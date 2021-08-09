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

</script>

    <!-- TODO:Implement with cards -->
    {#each data.properties as row}
            <div>
                <ExpansionPanel bind:name={row.name} bind:id={row.id}>
                    <td>
                        <input type="text" bind:value={row.name}/>
                    </td>
                    <td>
                        <input type="text" bind:value={row.description}/>
                    </td>
                    <button on:click={() => removeProperty(row.id)}> Delete </button>
                </ExpansionPanel>
            </div>
    {:else}
        <div>There are no properties yet.</div>
    {/each}
        <button on:click={() => addProperty()}> add </button>
