<script lang="ts">
    import { onMount } from "svelte";
    import Sidebar from "./Sidebar.svelte";
    import DescriptionTab from "./tabs/DescriptionTab.svelte";
    let test = "w";
    let loaded = false;

    //it is called when the svelte is ready
    onMount(() => {

        tsvscode.postMessage(
            {
                command: 'init-view',
                value: null
            }
        );
    })

    let jsonData = {
        "descriptionTabData":{}
            // "name": "",
             //"picture":""
            // "shortDescription": "",
            // "description": "",
            // "example": ""
            }

        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.command) {
                case "test-message":
                    test = message.value
                    return;
                case "init-message":
                    jsonData=JSON.parse(message.value);
                    
                    loaded = true;
				    return;
                /* case "update":
                    const value = message.value;
                    // Update our webview's content
                    jsonData = JSON.parse(value);
                    // Then persist state information.
                    // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
                    tsvscode.setState({ value });

                    return; */
            }
        })

    function handleMessage(event: any) {
	switch (event.detail.type) {
		case "update-descriptionTab":
            tsvscode.postMessage({
                command: 'update-descriptionTab',
                value:  JSON.stringify(jsonData.descriptionTabData)
            });
			break;
        case "update":
            tsvscode.postMessage({
                command: 'update',
                value:  JSON.stringify(jsonData)
            });
			break;
		default:
			break;
	}

}

</script>


<div>{test}</div>
almaaaaaaaaaa
<button on:click={() => {
    tsvscode.postMessage({command: 'alert', value: 'Katalin meg Gáspár elmennek vásár!'});
}}>Clk for error</button>

<div/><div/><div/>

{#if loaded}
    <DescriptionTab bind:data={jsonData.descriptionTabData} on:message={handleMessage} />
{:else}
    Loading
{/if}

