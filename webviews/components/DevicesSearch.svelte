<script lang="ts">
    import Accordion from "../../node_modules/svelte-collapsible/src/components/Accordion.svelte"
    import AccordionItem from "../../node_modules/svelte-collapsible/src/components/AccordionItem.svelte"
    import type {DevicesData} from "../../src/Models/devicesData";
import type { MethodsTabData } from "../../src/Models/TabDatas/methodsTabData";
import MethodsTab from "./tabs/MethodsTab.svelte";
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
            
            <div slot='body' class='accbody'>
                <h3 class="SideHeader">{ item.descriptionTabData.description }</h3>
                INIT
                <h6>#include "{item.descriptionTabData.name}/{item.descriptionTabData.name}.h"</h6>
                METHODS
                {#each item.methodsTabData.methods as method}
                    <h4>{method.name}</h4>

                {/each}
                <h6>#include "{item.descriptionTabData.name}/{item.descriptionTabData.name}.h"</h6>
                PARAMETERS


            </div>

        </AccordionItem>

    
        
    {/each}

</div>
</Accordion>