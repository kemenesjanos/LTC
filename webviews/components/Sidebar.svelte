<script lang="ts">
    import { onMount } from "svelte";
    import DevicesSearch from "../components/DevicesSearch.svelte"
    import type {DevicesData} from "../../src/Models/devicesData";
    import type { Device } from "../../src/Models/deviceData";
    let devices: DevicesData;

    let loaded = false;

    onMount(() => {
        tsvscode.postMessage({
            command: "init-view",
            value: null,
        });
    });

    window.addEventListener("message", (event) => {
        const message = event.data;
        switch (message.command) {
            case "init-message":
                devices = JSON.parse(message.value) as DevicesData;
                loaded = true;
                break;
            case "init-device":
                let newDev = JSON.parse(message.value) as Device;
                let idx = devices.devices.findIndex(x => x.id === newDev.id);
                devices.devices[idx] = newDev;
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
        tsvscode.postMessage({ command: "openLTCProjects", value: "" });
    }}>Open LTC Projects</button
>

{#if loaded && devices.devices.length !== 0}
    <DevicesSearch bind:devices = {devices}/>
{/if}

