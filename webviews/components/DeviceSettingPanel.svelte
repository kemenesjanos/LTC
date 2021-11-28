<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import DescriptionTab from "./tabs/DescriptionTab.svelte";
    import PropertiesTab from "./tabs/PropertiesTab.svelte";
    import MethodsTab from "./tabs/MethodsTab.svelte";
    import ClassTab from "./tabs/ClassTab.svelte";
    import Tabs from "./sharedComponents/Tabs.svelte";
    import VerticalTabs from "./sharedComponents/VerticalTabs.svelte";
import type { Device } from "../../src/Models/deviceData";

    let loaded = false;

    // let jsonData = {
    //     devices: [
    //         {
    //             descriptionTabData: { name: "" },
    //             propertiesTabData: {},
    //             methodsTabData: {},
    //             classTabData: {},
    //             id: "",
    //         },
    //     ],
    // };
    let devices: Device[];

    let items = ["Description", "Properties", "Methods", "Class"];
    let activeItem = "Description";

    let activeDevice: Device | null = null;

    // let actualDevice = "";
    // let actualDeviceSN = 0;

    // $: {
    //     if (loaded) {
    //         actualDevice = devices[actualDeviceSN].id;
    //     }
    // }

    // $: {
    //     if (loaded && activeDevice && activeDevice.id !== "") {
    //                 tsvscode.postMessage({
    //                     command: "updateDevice",
    //                     value: JSON.stringify(activeDevice),
    //                 });
    //         // tsvscode.postMessage({
    //         //     command: "save",
    //         // });
    //         //tsvscode.setState({ state: {activeDevice: JSON.stringify(jsonData)} });
    //     }
    // }

    function ModifyActiveDevice() {
        tsvscode.postMessage({
                command: "updateDevice",
                value: JSON.stringify(activeDevice),
            });
            
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
            case "init-device":
                let newDev = JSON.parse(message.value) as Device;
                let idx = devices.findIndex(x => x.id === newDev.id);
                devices[idx] = newDev;
                break;
            case "init-message":
                devices = JSON.parse(message.value) as Device[];

                if (devices.length === 0) {
                    activeDevice = null;
                } else {
                    if (activeDevice === null) {
                        activeDevice = devices[0];
                    }
                    else {
                        activeDevice =
                            devices[
                                devices.findIndex(
                                    (x) => x.id === activeDevice?.id
                                )
                            ];
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
                let tmp : Device[] = devices.filter(
                                (x) => x.id === event.detail.updateID
                            );
                if (devices.length !== 0 && tmp.length !== 0) {
                    tsvscode.postMessage({
                        command: "updateDevice",
                        value: JSON.stringify(
                            tmp[0]
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
                    deviceId: activeDevice?.id,
                });
                break;
            case "addProperty":
                tsvscode.postMessage({
                    command: "addProperty",
                    deviceId: activeDevice?.id,
                });
                break;
            case "removeMethod":
                tsvscode.postMessage({
                    command: "removeMethod",
                    value: event.detail.methodId,
                    deviceId: activeDevice?.id,
                });
                break;
            case "addMethod":
                tsvscode.postMessage({
                    command: "addMethod",
                    deviceId: activeDevice?.id,
                });
                break;
            case "removeParameter":
                tsvscode.postMessage({
                    command: "removeParameter",
                    value: event.detail.parameterId,
                    methodId: event.detail.methodId,
                    deviceId: activeDevice?.id,
                });
                break;
            case "addParameter":
                tsvscode.postMessage({
                    command: "addParameter",
                    value: event.detail.methodId,
                    deviceId: activeDevice?.id,
                });
                break;

            default:
                break;
        }
    }

    
    // if (tsvscode.getState()?.value.activeDevice) {
    //     console.log(JSON.parse(tsvscode.getState()?.value.activeDevice))
    // }

    // $: {
    //     if (devices.length !== 0 && activeDevice) {
    //         devices[
    //             devices.findIndex((x) => x.id === activeDevice.id)
    //         ] = activeDevice;
    //     }
    // }

    const tabChange = (e: { detail: string }) => {ModifyActiveDevice(); activeItem = e.detail; };

    const vertTabChange = (e: { detail: any }) => {ModifyActiveDevice();
        activeDevice = devices.find((x) => x.id === e.detail.id)!;
    };

    function addDevice() {
        tsvscode.postMessage({
            command: "addDevice",
            value: null,
        });
    }

    function removeDevice() {
        if(activeDevice){
            tsvscode.postMessage({
                command: "removeDevice",
                value: JSON.stringify(activeDevice),
            });
            activeDevice = null;
        }
    }

    function createClass(){
        tsvscode.postMessage({
            command: "createClass",
            value: JSON.stringify(activeDevice),
        });

    }
</script>

{#if loaded}
        <button class="roundButton" on:click={() => addDevice()}>Add</button>
        {#if devices.length !== 0}
        <div class="DeviceSettingPanelContainer">
            
            <div>
                <div style="display: flex;">
                    <button class="roundButton" disabled={devices.length !== 0} on:click={() => removeDevice()}>Remove</button>
                </div>

                <div style="margin-top: 5px;">
                    <VerticalTabs
                    vertActiveItem={activeDevice}
                    vertItems={devices}
                    on:vertTabChange={vertTabChange}
                    />
                </div>
                
                
            </div>
            
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
