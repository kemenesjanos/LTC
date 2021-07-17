<script>
    import { createEventDispatcher } from 'svelte';
    export let data;

    const dispatch = createEventDispatcher();
    
    function dataUpdated() {
        dispatch('message', {
		"type" : "update"});
    }

</script>
    <div>
        <div>Properties</div>
</div>

    