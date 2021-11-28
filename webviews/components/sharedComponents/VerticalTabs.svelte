<script lang="ts">
    import { createEventDispatcher } from 'svelte';
import type { Device } from '../../../src/Models/deviceData';
    let dispatch = createEventDispatcher();
    
    export let vertItems: Device[];
    export let vertActiveItem: Device | null;
  </script>
  
  <div class="vertTabs" style="overflow-x:auto;">
      {#each vertItems as item}
        <p on:click={() => dispatch('vertTabChange', item)}>
          <li class:vActive={item === vertActiveItem}>{item.descriptionTabData.name }</li>
        </p>
      {/each}
  </div>
  
