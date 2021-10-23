<script>
    import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";
    import ExpansionPanel from "../sharedComponents/ExpansionPanel.svelte";
    import TextArea from "../sharedComponents/TextAreaAutosize.svelte";
    import Switch from "../sharedComponents/Switch.svelte"

    export let data;

    //export const userTypes = { string : "string", void : "void", char : "char", int : "int", bool : "bool" };
    const userTypes = ["String", "char", "int", "bool"];

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
                    <td width="5%">Is public?</td>
                    <td width="10%">Type</td>
                    <td width="25%">Name</td>
                    <td width="25%">Initial Value</td>
                    <td width="35%">Description</td>
                </tr>
                <tr>
                    <td>
                        <Switch bind:checked={row.isPublic}></Switch>
                        {row.isPublic ? "Yes" : "No"}
                    </td>
                    <td>
                        <!-- svelte-ignore a11y-no-onchange -->
                        <select
                            bind:value={row.type}
                            on:change={() => (row.initialValue = "")}
                        >
                            {#each userTypes as type}
                                <option value={type}>
                                    {type}
                                </option>
                            {/each}
                        </select>
                    </td>
                    <td>
                            <TextArea
                            isRequired
                            isNotContaineSpaceOrEnter
                                bind:value={row.name}
                                minRows={1}
                                maxRows={1}
                                maxLength="30"
                            />
                    </td>

                    <td>
                        {#if row.type === "String"}
                            <TextArea
                                bind:value={row.initialValue}
                                isNotContaineSpaceOrEnter
                                minRows={1}
                                maxRows={1}
                                maxLength="30"
                            />
                        {:else if row.type === "char"}
                            <input
                                maxlength="1"
                                bind:value={row.initialValue}
                            />
                        {:else if row.type === "int"}
                            <input
                                type="number"
                                bind:value={row.initialValue}
                            />
                        {:else if row.type === "bool"}
                            <select bind:value={row.initialValue}>
                                <option value={true}> true </option>
                                <option value={false}> false </option>
                                <option value={null}> nothing </option>
                            </select>
                        {/if}
                    </td>
                    <td>
                        <TextArea
                            bind:value={row.description}
                            minRows={1}
                            maxRows={10}
                            placeholder="Desc"
                        />
                    </td>
                </tr>
            </table>

            <button class="roundButton" on:click={() => removeProperty(row.id)}> Delete </button>
        </ExpansionPanel>
    </div>
{:else}
    <div>There are no properties yet.</div>
{/each}
<button class="roundButton" on:click={() => addProperty()}> add </button>
