<script lang="ts">
    let todos = [];
    let count = 0;
</script>

<input />

<div>{count}</div>

<button
    on:dblclick={() => {
        count += 8;
    }}
    on:click={() => {
        count++;
    }}
>
    increment
</button>

<style>
    div {
        color: blue;
    }
</style>
