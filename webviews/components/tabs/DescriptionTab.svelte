<script>
    import { createEventDispatcher } from 'svelte';
    export let data;

    const onFileSelected =(e)=>{
  let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 data.picture = e.target.result
            };
    }



    const dispatch = createEventDispatcher();
    
    function dataUpdated() {
        dispatch('message', {
		"type" : "update"});
    }

</script>
    <div>
        <div>Name: <input type="text" bind:value={data.name} on:input={dataUpdated}/></div>
        <!-- <div>Picture: <input type="file" accept="image/png, image/jpeg" bind:value={data.picture} on:input={dataUpdated} /></div> -->
        <div>ShortDescription: <textarea bind:value={data.shortDescription} on:input={dataUpdated}/></div>
        <div>Description: <textarea bind:value={data.description} on:input={dataUpdated}/></div>
        <div>Example: <textarea bind:value={data.example} on:input={dataUpdated}/></div>
        <div>Teszt: <textarea bind:value={data.example} on:input={dataUpdated}/></div>

        <!-- <input  type="file" accept=".jpg, .jpeg, .png" on:input={dataUpdated} on:change={(e)=>onFileSelected(e)} bind:this={data.picture} />
        <img class="data.picture" height="100" width="100" src="{data.picture}" alt="d" /> -->
</div>

    