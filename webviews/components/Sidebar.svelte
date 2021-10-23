<script lang="ts">
    import { onMount } from "svelte";
    import DevicesSearch from "../components/DevicesSearch.svelte"
    import type {DevicesData} from "../../src/Models/devicesData";
    let devices: DevicesData;

    let loaded = false;

    let jsonData = {
        devices: [
            {
                descriptionTabData: { name: "" },
                propertiesTabData: {},
                methodsTabData: {},
                classTabData: {},
                id: "",
            },
        ],
    };

    onMount(() => {
        tsvscode.postMessage({
            command: "init-view",
            value: null,
        });
    });

    window.addEventListener("message", (event) => {
        const message = event.data;
        switch (message.command) {
            case "add-message":
                break;
            case "init-message":
                jsonData = JSON.parse(message.value);
                devices = jsonData as DevicesData;
                loaded = true;
                break;
        }
    });
</script>

<button class="roundButton"
    on:click={() => {
        tsvscode.postMessage({ command: "newLTCProject", value: "" });
    }}>New LTC Project</button
>

<button class="roundButton"
    on:click={() => {
        tsvscode.postMessage({ command: "openLTCProject", value: "" });
    }}>Open LTC Project</button
>

<button class="roundButton"
    on:click={() => {
        tsvscode.postMessage({ command: "reInit", value: "" });
    }}>Re Init Project</button
>

{#if loaded && jsonData.devices.length !== 0}
    <DevicesSearch bind:devices = {devices} />
{/if}