<script lang="ts">
    import { onMount } from "svelte";
    import Sidebar from "./Sidebar.svelte";
    import DescriptionTab from "./tabs/DescriptionTab.svelte"
    let test = "w";

    //it is called when the svelte is ready
    onMount(() => {

        tsvscode.postMessage(
            {
                //Todo: implement this
                command: 'init-view',
                value: null
            }
        );
    })

    let jsonData = {
            "name": "Kezd",
            "picture": "",
            "shortDescription": "sk",
            "description": "sf",
            "example": "sfdv"
            }

        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.command) {
                case "test-message":
                    test = message.value
                    return;
                case "add-message":

                    jsonData = JSON.parse(message.value);

				    return;
                case "update":
                    const value = message.value;
                    // Update our webview's content
                    jsonData = JSON.parse(value);
                    // Then persist state information.
                    // This state is returned in the call to `vscode.getState` below when a webview is reloaded.
                    tsvscode.setState({ value });

                    return;
            }
        })
    function pushDataUpdate() {
		tsvscode.postMessage({
			command: 'update',
			value:  JSON.stringify(jsonData)
		});
	}

    function handleMessage(event: any) {
	switch (event.detail.type) {
		case "update":
			pushDataUpdate();
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

<DescriptionTab bind:data={jsonData} on:message={handleMessage} />
