<script>
    import { createEventDispatcher } from 'svelte';

    import { fade } from 'svelte/transition'
import ClassTab from './ClassTab.svelte';

    export let data;

    const dispatch = createEventDispatcher();
    
    function dataUpdated() {
        dispatch('message', {
		"type" : "update"});
    }
	
    function addRow() {
		ddata = [...ddata, [...newRow]]
		newRow = columns
	}
	
	function deleteRow(rowToBeDeleted) {
		ddata = ddata.filter(row => row != rowToBeDeleted)
	}

	let columns = ["Name", "Email", "Phone Number"]
	let ddata = [
    ["John", "john@example.com", "(353) 01 222 3333"],
    ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
    ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
    ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
    ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
  ]
	let newRow = [...columns];

</script>
    <div>
        <div>Properties</div>
</div>

<table>
	<tr>
		{#each columns as column}
			<th>{column}</th>
		{/each}
	</tr>
	
	{#each ddata as row}
        <tr>
			{#each row as cell}
			<td contenteditable="true" bind:innerHTML={cell} />
			{/each}
			<button on:click={() => deleteRow(row)}>
				Delete
			</button>
		</tr>
		
	{/each}
	
	<tr class="new">
		{#each newRow as column}
			<td contenteditable="true" bind:innerHTML={column} />
		{/each}
		<button on:click={addRow}>
	add
</button>
	</tr>
</table>

