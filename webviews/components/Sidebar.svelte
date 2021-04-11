<script lang="ts">
    import { onMount } from "svelte";

    let todos = [];
    let count = 0;
    let test ={
        szoveg: String,
        szam: Number
    }
    onMount(() => {
        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.command) {
                case "add-message":
                    test = message.value
                    break;
            }
        })
    })
    
</script>

<input />

<div>{test.szam + " " + test.szoveg}</div>

<div>{count}</div>

<button on:click={() => {
    tsvscode.postMessage({command: 'onInfo', value: 'info message'});
}}>Clk for info</button>

<button on:click={() => {
    tsvscode.postMessage({command: 'onError', value: 'error message'});
}}>Clk for error</button>

<button on:click={() => {
    tsvscode.postMessage({command: 'test', value: 'dddddddddd'});
}}>Test</button>

<button
    on:dblclick={() => {
        count += 8;
    }}
    on:click={() => {
        count++;
    }}
>
    increment
</button>

<style>
    div {
        color: blue;
    }
</style>
