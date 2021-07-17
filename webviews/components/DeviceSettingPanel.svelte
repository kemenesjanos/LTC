<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { globals } from "svelte/internal";
    import DescriptionTab from "./tabs/DescriptionTab.svelte";
    import { Tabs, TabList, TabPanel, Tab } from './tabComponents/tabs.js';

    let loaded = false;
    let jsonData = {
        devices: [{ descriptionTabData: {}, id: "" }],
    };

    

    //it is called when the svelte is ready
    onMount(() => {
        tsvscode.postMessage({
            command: "init-view",
            value: null,
        });
    });

    onDestroy(() => {
        tsvscode.postMessage({
            command: "alert",
            value: "teszt",
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
            case "update-descriptionTab":
                // tsvscode.postMessage({
                //     command: 'update-descriptionTab',
                //     value:  JSON.stringify(jsonData.descriptionTabData)
                // });
                break;
            case "update":
                tsvscode.postMessage({
                    command: "update",
                    value: JSON.stringify(jsonData),
                });
                //TODO: place to somewhere else
                tsvscode.postMessage({
                    command: "save",
                    value: JSON.stringify(jsonData),
                });

                break;
            case "updateDevice":
                tsvscode.postMessage({
                    command: "updateDevice",
                    value: jsonData.devices.filter(
                        (x) => x.id === event.detail.updateID
                    ),
                });
                break;
            case "removeDevice":
                tsvscode.postMessage({
                    command: "removeDevice",
                    value: event.detail.removeId,
                });
                break;
            case "addDevice":
                tsvscode.postMessage({
                    command: "addDevice",
                    value: null,
                });
                break;
            default:
                break;
        }
    }

    
</script>

{#if loaded}
<Tabs>
	<TabList>
		<Tab>one</Tab>
		<Tab>two</Tab>
		<Tab>three</Tab>
	</TabList>

	<TabPanel>
		<h2>First panel</h2>
	</TabPanel>

	<TabPanel>
		<h2>Second panel</h2>
	</TabPanel>

	<TabPanel>
		<h2>Third panel</h2>
	</TabPanel>
</Tabs>
{:else}
    Loading
{/if}
