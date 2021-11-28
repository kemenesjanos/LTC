<script lang="ts">
    import Accordion from "../../node_modules/svelte-collapsible/src/components/Accordion.svelte"
    import AccordionItem from "../../node_modules/svelte-collapsible/src/components/AccordionItem.svelte"
    import type {DevicesData} from "../../src/Models/devicesData";
    import type { Method } from "../../src/Models/method";
    import type { Parameter } from "../../src/Models/parameter";
    import type { Property } from "../../src/Models/property";
    export let devices: DevicesData;

    export function createMethod(meth: Method, isCpp: boolean, modelsName: string): string {
  var res = "";
  if (meth.returnType !== "constructor") {
    res += meth.returnType + " ";
  }

  if (isCpp) {
    res += modelsName + "::";
  }

  if(meth.returnType === "constructor"){
    res += modelsName;
  }
  else{
    res += meth.name;
  }
  res += "(";
  if(meth.parameters.length !== 0){
    for (var i = 0; i < meth.parameters.length-1; i++) {
      res += createProperty(meth.parameters[i], isCpp);
      res += ", ";
    }
    res += createProperty(meth.parameters[meth.parameters.length-1], isCpp);
  }
  

  res += ")";
  if (!isCpp) {
    res += `;`;
  }

  res += "\n";
  return res;
}

function createProperty(param: Property | Parameter, isCpp: boolean): string {
  var res = param.type + " " + param.name;
  if (param.initialValue !== "" && isCpp) {
    res += " = ";
    if (param.type === "String") {
      res += `"` + param.initialValue + `"`;
    }
    else if (param.type === "char") {
      res += `'` + param.initialValue + `'`;
    }
    else {
      res += param.initialValue;
    }
  }

  return res;
}
    
</script>

<Accordion>

    <div aria-orientation="vertical">

    {#each devices.devices as item}

    
        <AccordionItem key={item.id}>
                
            <div slot='header' class='accheader'>
                <img src={item.descriptionTabData.picture.toString()} alt="Cover"/>
                <div>
                    <h2>{ item.descriptionTabData.name }</h2>
                    <p>{ item.descriptionTabData.shortDescription }</p>
                </div>
            </div>
            
            <div slot='body' class='accbody'>
                <div>{ item.descriptionTabData.description }</div>
                <div class="spaced">EXAMPLE</div>
                <div><small>{item.descriptionTabData.example}</small></div>
                <div class="spaced">PARAMETERS</div>
                
                {#each item.propertiesTabData.properties as property}
                    <div class="SideHeader">{property.name}</div>
                    <div>{property.description}</div>
                    <hr>
                    <div/>
                {/each}
                <div class="spaced">METHODS</div>
                {#each item.methodsTabData.methods as method}
                    {#if method.returnType === "constructor"}
                        <div class="SideHeader">Konstruktor</div>
                        <small>{createMethod(method, false, item.descriptionTabData.name)}</small>
                        <div>{method.description}</div>
                    {:else}
                        <div class="SideHeader">{method.name}</div>
                        <small>{createMethod(method, false, item.descriptionTabData.name)}</small>
                        <div>{method.description}</div>
                    {/if}
                    <hr>
                    <div/>
                {/each}
                


            </div>
            <hr>

        </AccordionItem>

    
        
    {/each}

</div>
</Accordion>