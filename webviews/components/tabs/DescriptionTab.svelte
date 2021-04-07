<script>
    import { createEventDispatcher } from 'svelte';
    export let data;
    const dispatch = createEventDispatcher();
    
    function dataUpdated() {
        tsvscode.postMessage(
            {
                //Todo: implement
                command: 'update'
            }
        )
    }
</script>

    <div>
        <div>Name: <input type="text" bind:value={data.name} on:input={dataUpdated}/></div>
        <div>Picture: <input type="file" accept="image/png, image/jpeg" bind:value={data.picture} on:input={dataUpdated}/></div>
        <div>ShortDescription: <textarea bind:value={data.shortDescription} on:input={dataUpdated}/></div>
        <div>Description: <textarea cols=50 bind:value={data.description} on:input={dataUpdated}/></div>
        <div>Example: <textarea cols="50" bind:value={data.example} on:input={dataUpdated}/></div>
        <div>Teszt: <textarea cols="50" bind:value={data.example} on:input={dataUpdated}/></div>
        
</div>

<style>
    textarea{
        resize: none;
    }
    div{
        color: aqua;
    }
</style>
    