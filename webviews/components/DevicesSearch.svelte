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
      

      <AccordionItem key = 1110>
        <div slot='header' class='accheader'>
          <div>
              <h2>Parancsok</h2>
              <p>Ezekkel tudod irányítani a program működését</p>
          </div>
        </div>
        <div slot='body' class='accbody'>
<strong><u>Típusok:</u></strong>

A programozási nyelveken a változóknak megadjuk a típusát, hogy tudjuk, milyen jellegű adatokat tárolnak.
Ha valakinek el akarjuk tárolni a nevét, akkor azt szöveg típusú változóban tudjuk tárolni, ha a korát, akkor azt szám típusban.

<strong>String</strong> : szöveg ( az értéket " jelek közé kell tennünk, hogy a program tudja, hogy itt nem kódot írunk)
  pl.: String neve = "Karcsika";

<strong>int</strong> : egész szám
  pl.: int kora = 18;

<strong>double</strong> : nem egész szám (itt pontot kell használni a tizedesveszző helyett)
  pl.: double sulya = 56.8;

<strong>bool</strong> : igaz-hamis ( az értéke csak true vagy false lehet)
  pl.: bool ferfi = true;

<strong>char</strong> : karakter ( az értéket ' jelek közé kell tennünk, hogy a program tudja, hogy itt nem kódot írunk)
  pl.: char kezdoBetuje = 'K';

          <hr>
<strong><u>Elágazás IF-ELSE:</u></strong>

Amit a zárójelek közé írsz az egy feltétel amelynek az értéke lehet igaz(true) vagy hamis(false).
Írhatsz bele olyat, hogy a==b ami megvizsgálja, hogy a egyenlő-e b-vel.
Vagy a {"<"} b vagy a {">"} b vagy a {"<="} b vagy a {">="} b.
Illetve olyan függvényt is használhatsz ami bool típusú eredményt ad vissza. Például: button.isButtonPushed(1).

Írhatsz csak egy if részt is, a többi nem kötelező.

if(IDE_ÍRSZ_EGY_ÁLLÍTÁST)
{"{"}
    HA_IGAZ_AKKOR_EZ_A_RÉSZ_FUT_LE
{"}"}
else if(MÁSIK_ÁLLÍTÁS)
{"{"}
    HA_IGAZ_AKKOR_EZ_A_RÉSZ_FUT_LE
{"}"}
else
{"{"}
    HA_MINDEGYIK_HAMIS_AKKOR_EZ
{"}"}
<hr>

        </div>
      </AccordionItem>

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