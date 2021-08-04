<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import DescriptionTab from "./tabs/DescriptionTab.svelte";
    import PropertiesTab from "./tabs/PropertiesTab.svelte";
    import MethodsTab from "./tabs/MethodsTab.svelte";
    import ClassTab from "./tabs/ClassTab.svelte";
    // import { Tabs, TabList, TabPanel, Tab } from './tabComponents/tabs.js';
    import Tabs from './sharedComponents/TabsTest.svelte';
    

    let loaded = false;

    let jsonData = {
        devices: [{ descriptionTabData: {}, propertiesTabData: {}, methodsTabData: {}, classTabData: {}, id: "" }],
    };

    let actualDevice = 0;

    
    $:{
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
                tsvscode.postMessage({
                    command: "updateDevice",
                    value: JSON.stringify(jsonData.devices.filter(
                        (x) => x.id === event.detail.updateID
                    )),
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
                    deviceId: jsonData.devices[actualDevice].id,
                });
                break;
            case "addProperty":
                tsvscode.postMessage({
                    command: "addProperty",
                    deviceId: jsonData.devices[actualDevice].id,
                });
                break;

            default:
                break;
        }
    }

    let items = ['Description', 'Properties', 'Methods', 'Class'];
    let activeItem = 'Description';
    const tabChange = (e: { detail: string; }) => activeItem = e.detail;
    
</script>

{#if loaded}
<Tabs {activeItem} {items} on:tabChange={tabChange} />
    {#if activeItem === 'Description'}
        <p><DescriptionTab bind:data={jsonData.devices[actualDevice].descriptionTabData} on:message={handleMessage} /> </p>
    {:else if activeItem === 'Properties'}
        <p><PropertiesTab bind:data={jsonData.devices[actualDevice].propertiesTabData} on:message={handleMessage} /></p>
    {:else if activeItem === 'Methods'}
        <p><MethodsTab bind:data={jsonData.devices[actualDevice].methodsTabData} on:message={handleMessage} /></p>
    {:else if activeItem === 'Class'}
        <p><ClassTab bind:data={jsonData.devices[actualDevice].classTabData} on:message={handleMessage} /></p>
  {/if}

<!-- 
<Tabs>
	<TabList>
		<Tab>Description</Tab>
		<Tab>Properties</Tab>
		<Tab>Methods</Tab>
        <Tab>Class</Tab>
	</TabList>

	<TabPanel>
		<h2>Description</h2>
        <DescriptionTab bind:data={jsonData.devices[actualDevice].descriptionTabData} on:message={handleMessage} />
	</TabPanel>

	<TabPanel>
		<h2>Properties</h2>
        <PropertiesTab bind:data={jsonData.devices[actualDevice].propertiesTabData} on:message={handleMessage} />
	</TabPanel>

	<TabPanel>
		<h2>Methods</h2>
        <MethodsTab bind:data={jsonData.devices[actualDevice].methodsTabData} on:message={handleMessage} />
	</TabPanel>

    <TabPanel>
		<h2>Class</h2>
        <ClassTab bind:data={jsonData.devices[actualDevice].classTabData} on:message={handleMessage} />
	</TabPanel>
</Tabs> -->
{:else}
    Loading
{/if}
