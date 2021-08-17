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
            <table width="100%">
                <tr>
                    <td width="20%">Return type:</td>
                    <td width="30%">Return type:</td>
                    <td width="50%"><TextArea required="true" bind:value={row.name} minRows={4} /></td>
                </tr>
            </table>

            <button on:click={() => removeProperty(row.id)}> Delete </button>
        </ExpansionPanel>
    </div>
{:else}
    <div>There are no properties yet.</div>
{/each}
<button on:click={() => addProperty()}> add </button>
