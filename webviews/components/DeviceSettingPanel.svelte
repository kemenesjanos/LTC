<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import DescriptionTab from "./tabs/DescriptionTab.svelte";
    import PropertiesTab from "./tabs/PropertiesTab.svelte";
    import MethodsTab from "./tabs/MethodsTab.svelte";
    import ClassTab from "./tabs/ClassTab.svelte";
    // import { Tabs, TabList, TabPanel, Tab } from './tabComponents/tabs.js';
    import Tabs from "./sharedComponents/Tabs.svelte";
    import { each, xlink_attr } from "svelte/internal";
    import VerticalTabs from "./sharedComponents/VerticalTabs.svelte";

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

    // let actualDevice = "";
    // let actualDeviceSN = 0;

    // $: {
    //     if (loaded) {
    //         actualDevice = jsonData.devices[actualDeviceSN].id;
    //     }
    // }

    $: {
        if (loaded) {
            tsvscode.postMessage({
                command: "update",
                value: JSON.stringify(jsonData),
            });
            tsvscode.postMessage({
                command: "save",
            });
        }
    }

    //it is called when the svelte is ready
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
                jsonData = JSON.parse(message.value);

                if (loaded) {
                    //vertActiveItem = jsonData.devices[0]
                    vertActiveItem = jsonData.devices[jsonData.devices.findIndex(x=> x.id === vertActiveItem.id)];
                }
                else{
                    vertActiveItem = jsonData.devices[0];
                    loaded = true;
                }
                
                
                
                break;
            /* case "update":
                const value = message.value;
                // Update our webview's content
                jsonData = JSON.parse(value);
                // Then persist state information.
                // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
                tsvscode.setState({ value });

                return; */
        }
    });

    function handleMessage(event: any) {
        switch (event.detail.type) {
            case "update":
            // tsvscode.postMessage({
            //     command: "update",
            //     value: JSON.stringify(jsonData),
            // });
            // tsvscode.postMessage({
            //     command: "save",
            // });
            // break;
            case "updateDevice":
                tsvscode.postMessage({
                    command: "updateDevice",
                    value: JSON.stringify(
                        jsonData.devices.filter(
                            (x) => x.id === event.detail.updateID
                        )
                    ),
                });
                break;
            case "removeDevice":
                tsvscode.postMessage({
                    command: "removeDevice",
                    value: JSON.stringify(event.detail.removeId),
                });
                break;
            case "addDevice":
                tsvscode.postMessage({
                    command: "addDevice",
                    value: null,
                });
                break;
            case "removeProperty":
                tsvscode.postMessage({
                    command: "removeProperty",
                    value: event.detail.propertyId,
                    deviceId: vertActiveItem.id,
                });
                break;
            case "addProperty":
                tsvscode.postMessage({
                    command: "addProperty",
                    deviceId: vertActiveItem.id,
                });
                break;

            default:
                break;
        }
    }

    let items = ["Description", "Properties", "Methods", "Class"];
    let activeItem = "Description";

    let vertItems = jsonData.devices;
    $: {
        vertItems = jsonData.devices;
    }

    let vertActiveItem = jsonData.devices[0];

    $:{
        jsonData.devices[jsonData.devices.findIndex(x=> x.id === vertActiveItem.id)] = vertActiveItem; 
    }

    const tabChange = (e: { detail: string }) => (activeItem = e.detail);

    const vertTabChange = (e: { detail: any }) => {
        vertActiveItem = jsonData.devices.find(x => x.id===e.detail.id)!;
    };

    function addDevice() {
        tsvscode.postMessage({
            command: "addDevice",
            value: null,
        });
    }
</script>

{#if loaded}
    <button on:click={() => addDevice()}>add</button>
    <div class="DeviceSettingPanelContainer">
        <VerticalTabs
            {vertActiveItem}
            {vertItems}
            on:vertTabChange={vertTabChange}
        />

        <!-- <select bind:value={actualDevice}>
        {#each jsonData.devices as device}
            <option value={device.id}>{device.descriptionTabData.name}</option>
        {/each}
    </select> -->
        <div>
            <Tabs {activeItem} {items} on:tabChange={tabChange} />
            {#if activeItem === "Description"}
                <p>
                    <DescriptionTab
                        bind:data={vertActiveItem
                            .descriptionTabData}
                        on:message={handleMessage}
                    />
                </p>
            {:else if activeItem === "Properties"}
                <p>
                    <PropertiesTab
                        bind:data={vertActiveItem.propertiesTabData}
                        on:message={handleMessage}
                    />
                </p>
            {:else if activeItem === "Methods"}
                <p>
                    <MethodsTab
                        bind:data={vertActiveItem
                            .methodsTabData}
                        on:message={handleMessage}
                    />
                </p>
            {:else if activeItem === "Class"}
                <p>
                    <ClassTab
                        bind:data={vertActiveItem
                            .classTabData}
                        on:message={handleMessage}
                    />
                </p>
            {/if}
        </div>
    </div>
{:else}
    Loading
{/if}
