<script>
    import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";
    import ExpansionPanel from "../sharedComponents/ExpansionPanel.svelte";
    import TextArea from "../sharedComponents/TextAreaAutosize.svelte";

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
            <TextArea
                required="true"
                bind:value={row.name}
                minRows={4}
            />

            <button on:click={() => removeProperty(row.id)}> Delete </button>
        </ExpansionPanel>
    </div>
{:else}
    <div>There are no properties yet.</div>
{/each}
<button on:click={() => addProperty()}> add </button>
