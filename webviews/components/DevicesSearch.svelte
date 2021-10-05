<script lang="ts">
    import Accordion from "../../node_modules/svelte-collapsible/src/components/Accordion.svelte"
    import AccordionItem from "../../node_modules/svelte-collapsible/src/components/AccordionItem.svelte"
    import type {DevicesData} from "../../src/Models/devicesData";
    export let devices: DevicesData;
</script>

<Accordion>

    <div aria-orientation="vertical">

    {#each devices.devices as item}

    
        <AccordionItem key={item.id}>
                
            <div slot='header' class='accheader'>
                <img src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg" alt="Cover"/>
                <div>
                    <h2>{ item.descriptionTabData.name }</h2>
                    <p>{ item.descriptionTabData.shortDescription }</p>
                </div>
            </div>
            
            <p slot='body' class='accbody'>
                { item.descriptionTabData.description }
            </p>

        </AccordionItem>

    
        
    {/each}

</div>
</Accordion>