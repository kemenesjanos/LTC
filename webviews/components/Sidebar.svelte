<script lang="ts">
    import { onMount } from "svelte";

    let loaded = false;
    let jsonData = {
        "":{}
    }

    onMount(() => {

        tsvscode.postMessage(
            {
                command: 'init-view',
                value: null
            }
        );
    })

    window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.command) {
                case "add-message":
                    break;
                case "init-message":
                    jsonData=JSON.parse(message.value);
                    loaded = true;
                    break;
            }
        })
    
</script>

<button on:click={() => {
    tsvscode.postMessage({command: 'newLTCProject', value: ''});
}}>New LTC Project</button>

<button on:click={() => {
    tsvscode.postMessage({command: 'openLTCProject', value: ''});
}}>Open LTC Project</button>
