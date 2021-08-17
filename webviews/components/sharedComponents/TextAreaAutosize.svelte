<script>
	export let value = '';
	export let minRows = 1;
	export let maxRows = 0;
	export let maxLength = 0;
	
	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="container">
	<pre
		aria-hidden="true"
		style="min-height: {minHeight}; max-height: {maxHeight};"
	>{value + '\n'}</pre>

	<textarea maxLength={maxLength ? maxLength : null} bind:value></textarea>	
</div>
