<script>
    import { createEventDispatcher } from 'svelte';
    import TextArea from "../sharedComponents/TextAreaAutosize.svelte";
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

    //TODO: implement this in the ts with command
    function pickImage() {
        dispatch('message', {
		"type" : "pickImage"});
    }

</script>
    <div>
        <div>Name: <TextArea bind:value={data.name} minRows={1}
            maxRows={10} maxLength={50} placeholder="Clock"/></div>
        <!-- <div>Picture: <input type="file" accept="image/png, image/jpeg" bind:value={data.picture} on:input={dataUpdated} /></div> -->
        <div>ShortDescription: <TextArea bind:value={data.shortDescription} minRows={4}
            maxRows={40}/></div>
        <div>Description: <TextArea bind:value={data.description} minRows={4}
            maxRows={40}/></div>
        <div>Example: <TextArea bind:value={data.example} minRows={4}
            maxRows={40}/></div>
        <div>Teszt: <TextArea bind:value={data.example} minRows={4}
            maxRows={40}/></div>

        <!-- <input  type="file" accept=".jpg, .jpeg, .png" on:input={dataUpdated} on:change={(e)=>onFileSelected(e)} bind:this={data.picture} />
        <img class="data.picture" height="100" width="100" src="{data.picture}" alt="d" /> -->
</div>

    