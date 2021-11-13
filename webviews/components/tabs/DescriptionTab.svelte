<script>
    import { createEventDispatcher } from 'svelte';
    import TextArea from "../sharedComponents/TextAreaAutosize.svelte";
    export let data;

    const types = ["Switch", "I2C", "Sensor", "Nothing"];

    const dispatch = createEventDispatcher();

    //TODO: implement this in the ts with command
    function pickImage() {
        dispatch('message', {
		"type" : "pickImage"});
    }


    let  avatar, fileinput;

    avatar = data.picture;
	
	const onFileSelected =(e)=>{
        let image = e.target.files[0];
        
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            avatar = e.target.result;
            data.picture = avatar;
            console.log(avatar);
        };
                
    }

    $:{
        if(data.picture){
            avatar = data.picture;
        }
        else{
            avatar = "";
        }
    }


</script>
    <div>
        <div>
            <div class="DescriptionHeader">
                Name: 
            </div> 
            <TextArea bind:value={data.name} minRows={1}
            maxRows={10} maxLength={50} isNotContaineSpaceOrEnter isRequired/></div>
        <div>
            <div class="DescriptionHeader">
                Type: 
            </div>
            <!-- svelte-ignore a11y-no-onchange -->
            <select
                            bind:value={data.type}
                        >
                            {#each types as type}
                                <option value={type}>
                                    {type}
                                </option>
                            {/each}
                        </select>
        </div>
        <div>Picture:
            {#if avatar}
            <img class="avatar" src="{avatar}" alt="d" />
            {:else}
            <img class="avatar" src="" alt="" /> 
            {/if}
                    <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
            <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
            <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
        </div>
        <div>
            <div class="DescriptionHeader">
                ShortDescription: 
            </div> 
            <TextArea bind:value={data.shortDescription} minRows={4}
            maxRows={40}/>
        </div>
        <div>
            <div class="DescriptionHeader">
                Description: 
            </div>
            <TextArea bind:value={data.description} minRows={4}
            maxRows={40}/>
        </div>
        <div>
            <div class="DescriptionHeader">
                Example: 
            </div>
            <TextArea bind:value={data.example} minRows={4}
            maxRows={40}/>
        </div>

</div>

    