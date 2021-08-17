<script>
    import { createEventDispatcher } from 'svelte';
    let dispatch = createEventDispatcher();
    
    export let vertItems;
    export let vertActiveItem;
  </script>
  
  <div class="vertTabs" style="overflow-x:auto;">
      {#each vertItems as item}
        <p on:click={() => dispatch('vertTabChange', item)}>
          <li class:vActive={item === vertActiveItem}>{item.descriptionTabData.name }</li>
        </p>
      {/each}
  </div>
  
