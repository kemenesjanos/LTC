<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import DescriptionTab from "./tabs/DescriptionTab.svelte";
    import PropertiesTab from "./tabs/PropertiesTab.svelte";
    import MethodsTab from "./tabs/MethodsTab.svelte";
    import ClassTab from "./tabs/ClassTab.svelte";
    import Tabs from "./sharedComponents/Tabs.svelte";
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
        if (loaded && jsonData.devices.length !== 0) {
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

    onDestroy(() => {
        tsvscode.postMessage({
            command: "dispose",
        });
    });

    window.addEventListener("message", (event) => {
        const message = event.data;
        switch (message.command) {
            case "init-message":
                jsonData = JSON.parse(message.value);

                if (jsonData.devices.length === 0) {
                    activeDevice = null;
                } else {
                    if (loaded) {
                        if (activeDevice === null) {
                            activeDevice = jsonData.devices[0];
                        } else {
                            activeDevice =
                                jsonData.devices[
                                    jsonData.devices.findIndex(
                                        (x) => x.id === activeDevice.id
                                    )
                                ];
                        }
                    } else {
                        
                        activeDevice = jsonData.devices[0];
                    }
                }

                loaded = true;

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
                if (jsonData.devices.length !== 0) {
                    tsvscode.postMessage({
                        command: "updateDevice",
                        value: JSON.stringify(
                            jsonData.devices.filter(
                                (x) => x.id === event.detail.updateID
                            )
                        ),
                    });
                }
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
                    deviceId: activeDevice.id,
                });
                break;
            case "addProperty":
                tsvscode.postMessage({
                    command: "addProperty",
                    deviceId: activeDevice.id,
                });
                break;
            case "removeMethod":
                tsvscode.postMessage({
                    command: "removeMethod",
                    value: event.detail.methodId,
                    deviceId: activeDevice.id,
                });
                break;
            case "addMethod":
                tsvscode.postMessage({
                    command: "addMethod",
                    deviceId: activeDevice.id,
                });
                break;
            case "removeParameter":
                tsvscode.postMessage({
                    command: "removeParameter",
                    value: event.detail.parameterId,
                    methodId: event.detail.methodId,
                    deviceId: activeDevice.id,
                });
                break;
            case "addParameter":
                tsvscode.postMessage({
                    command: "addParameter",
                    value: event.detail.methodId,
                    deviceId: activeDevice.id,
                });
                break;

            default:
                break;
        }
    }

    let items = ["Description", "Properties", "Methods", "Class"];
    let activeItem = "Description";

    let activeDevice: any = tsvscode.getState()?.activeDevice || jsonData.devices[0];

    $:{
        tsvscode.setState({activeDevice});
    }

    $: {
        if (jsonData.devices.length !== 0 && activeDevice) {
            jsonData.devices[
                jsonData.devices.findIndex((x) => x.id === activeDevice.id)
            ] = activeDevice;
        }
    }

    const tabChange = (e: { detail: string }) => (activeItem = e.detail);

    const vertTabChange = (e: { detail: any }) => {
        activeDevice = jsonData?.devices.find((x) => x.id === e.detail.id)!;
    };

    function addDevice() {
        tsvscode.postMessage({
            command: "addDevice",
            value: null,
        });
    }

    function removeDevice() {
        tsvscode.postMessage({
            command: "removeDevice",
            value: JSON.stringify(activeDevice),
        });

        activeDevice = null;
    }

    function createClass(){
        tsvscode.postMessage({
            command: "createClass",
            value: JSON.stringify(activeDevice),
        });

    }
</script>

{#if loaded}
    
    {#if jsonData.devices.length !== 0}
    
        <div class="DeviceSettingPanelContainer">
            
            <div>
                <div style="display: flex;">
                    <button class="roundButton" on:click={() => addDevice()}>Add</button>
                    <button class="roundButton" disabled={jsonData === null} on:click={() => removeDevice()}>Remove</button>
                </div>

                <div style="margin-top: 5px;">
                    <VerticalTabs
                    vertActiveItem={activeDevice}
                    vertItems={jsonData.devices}
                    on:vertTabChange={vertTabChange}
                    />
                </div>
                
                
            </div>
            

            <!-- <select bind:value={actualDevice}>
        {#each jsonData.devices as device}
            <option value={device.id}>{device.descriptionTabData.name}</option>
        {/each}
    </select> -->
            {#if activeDevice}
                <div style="overflow-x:auto;">
                    <Tabs {activeItem} {items} on:tabChange={tabChange} />
                    
                    {#if activeItem === "Description"}
                        <p>
                            <DescriptionTab
                                bind:data={activeDevice.descriptionTabData}
                                on:message={handleMessage}
                            />
                        </p>
                    {:else if activeItem === "Properties"}
                        <p>
                            <PropertiesTab
                                bind:data={activeDevice.propertiesTabData}
                                on:message={handleMessage}
                            />
                        </p>
                    {:else if activeItem === "Methods"}
                        <p>
                            <MethodsTab
                                bind:data={activeDevice.methodsTabData}
                                on:message={handleMessage}
                            />
                        </p>
                    {:else if activeItem === "Class"}
                        <p>
                            <button on:click={() => createClass()}>Create Class</button>
                            <ClassTab
                                bind:data={activeDevice.classTabData}
                                on:message={handleMessage}
                            />
                        </p>
                    {/if}
                </div>
            {/if}
        </div>
    {/if}
{:else}
    Loading
{/if}
