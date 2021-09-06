<script>
    import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";
    import ExpansionPanel from "../sharedComponents/ExpansionPanel.svelte";
    import TextArea from "../sharedComponents/TextAreaAutosize.svelte";
    import Switch from "../sharedComponents/Switch.svelte";

    export let data;

    const returnTypes = ["void", "string", "char", "int", "bool"];
    const paramTypes = ["string", "char", "int", "bool"];

    const dispatch = createEventDispatcher();

    function dataUpdated() {
        dispatch("message", {
            type: "update",
        });
    }

    function addMethod() {
        dispatch("message", {
            type: "addMethod",
        });
    }

    function removeMethod(methodId) {
        dispatch("message", {
            type: "removeMethod",
            methodId: methodId,
        });
    }

    function addParameter(methodId) {
        dispatch("message", {
            type: "addParameter",
            methodId: methodId,
        });
    }

    function removeParameter(methodId, parameterId) {
        dispatch("message", {
            type: "removeParameter",
            methodId: methodId,
            parameterId: parameterId,
        });
    }

    function validate_name(name) {
        return name.includes(" ");
    }
</script>

{#each data.methods as row}
    <div>
        <ExpansionPanel bind:name={row.name} bind:id={row.id}>
            <table width="100%">
                <tr>
                    <td>
                        Is public?
                    </td>
                    <td>
                        <Switch bind:checked={row.isPublic}></Switch>
                        {row.isPublic ? "Yes" : "No"}
                    </td>
                </tr>
                <tr>
                    <td width="10%">Method name:</td>
                    <td width="20%">
                        <TextArea
                            bind:value={row.name}
                            isRequired
                            isNotContaineSpace
                            minRows={1}
                            maxRows={1}
                            maxLength="30"
                        />
                    </td>
                    <td width="10%">Description</td>
                    <td width="60%">
                        <div>
                            <TextArea
                                bind:value={row.description}
                                minRows={1}
                                maxRows={10}
                                placeholder="Desc"
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td width="10%">Return type:</td>
                    <td width="20%">
                        <!-- svelte-ignore a11y-no-onchange -->
                        <select
                            bind:value={row.type}
                            on:change={() => (row.initialValue = "")}
                        >
                            {#each returnTypes as type}
                                <option value={type}>
                                    {type}
                                </option>
                            {/each}
                        </select>
                    </td>
                    <td width="10%">Description:</td>
                    <td width="60%">
                        <div>
                            <TextArea
                                bind:value={row.returnDescription}
                                minRows={1}
                                maxRows={10}
                                placeholder="Desc"
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td width="10%">Type</td>
                    <td width="25%">Name</td>
                    <td width="25%">Initial Value</td>
                    <td width="40%">Description</td>
                </tr>
                {#each row.parameters as param}
                    <tr>
                        <td>
                            <!-- svelte-ignore a11y-no-onchange -->
                            <select
                                bind:value={param.type}
                                on:change={() => (param.initialValue = "")}
                            >
                                {#each paramTypes as type}
                                    <option value={type}>
                                        {type}
                                    </option>
                                {/each}
                            </select>
                        </td>
                        <td>
                            <TextArea
                                bind:value={param.name}
                                isRequired
                                isNotContaineSpace
                                minRows={1}
                                maxRows={1}
                                maxLength="30"
                            />
                        </td>

                        <td>
                            {#if param.type === "string"}
                                <TextArea
                                    bind:value={param.initialValue}
                                    minRows={1}
                                    maxRows={1}
                                    maxLength="30"
                                />
                            {:else if param.type === "char"}
                                <input
                                    maxlength="1"
                                    bind:value={param.initialValue}
                                />
                            {:else if param.type === "int"}
                                <input
                                    type="number"
                                    bind:value={param.initialValue}
                                />
                            {:else if param.type === "bool"}
                                <select bind:value={param.initialValue}>
                                    <option value={true}> true </option>
                                    <option value={false}> false </option>
                                    <option value={""}>nothing</option>
                                </select>
                            {/if}
                        </td>
                        <td>
                            <TextArea
                                bind:value={param.description}
                                minRows={1}
                                maxRows={10}
                                placeholder="Desc"
                            />
                        </td>
                    </tr>
                    <button on:click={() => removeParameter(row.id, param.id)}>
                        Delete
                    </button>
                {/each}
                <tr>
                    <button on:click={() => addParameter(row.id)}> Add </button>
                </tr>
            </table>

            <button on:click={() => removeMethod(row.id)}> Delete </button>
        </ExpansionPanel>
    </div>
{:else}
    <div>There are no methods yet.</div>
{/each}
<button on:click={() => addMethod()}> add </button>
