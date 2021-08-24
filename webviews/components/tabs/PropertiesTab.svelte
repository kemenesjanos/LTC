<script>
    import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";
    import ExpansionPanel from "../sharedComponents/ExpansionPanel.svelte";
    import TextArea from "../sharedComponents/TextAreaAutosize.svelte";

    import {
        emailValidator,
        requiredValidator,
    } from "../sharedComponents/Validation/validators.js";
    import { createFieldValidator } from "../sharedComponents/Validation/validation.js";

    const [validity, validate] = createFieldValidator(
        requiredValidator(),
        emailValidator()
    );

    export let data;

    //export const userTypes = { string : "string", void : "void", char : "char", int : "int", bool : "bool" };
    const userTypes = ["void", "string", "char", "int", "bool"];

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

    function validate_name(name) {
        return name.includes(" ");
    }
</script>

<!-- TODO:Implement with cards -->
{#each data.properties as row}
    <div>
        <ExpansionPanel bind:name={row.name} bind:id={row.id}>
            <table width="100%">
                <tr>
                    <td width="10%">Type</td>
                    <td width="25%">Name</td>
                    <td width="25%">Initial Value</td>
                    <td width="40%">Description</td>
                </tr>
                <tr>
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
                        <div use:validate={row.name} >
                            <TextArea
                                isValid={$validity.valid}
                                bind:value={row.name}
                                minRows={1}
                                maxRows={1}
                                maxLength="30"
                            />
                        </div>

                        {#if $validity.dirty && !$validity.valid}
                            <div class="validation-hint">
                                INVALID - {$validity.message}
                                <!-- {$validity.dirty} -->
                            </div>
                            {:else}
                            
                            <div/>
                        {/if}
                        
                    </td>

                    <td>
                        {#if row.type === "void"}
                            Nothing
                        {:else if row.type === "string"}
                            <TextArea
                                bind:value={row.initialValue}
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

            <button on:click={() => removeProperty(row.id)}> Delete </button>
        </ExpansionPanel>
    </div>
{:else}
    <div>There are no properties yet.</div>
{/each}
<button on:click={() => addProperty()}> add </button>
