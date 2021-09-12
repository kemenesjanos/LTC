<script>
	export let value = "";
	export let minRows = 1;
	export let maxRows = 0;
	export let maxLength = 0;
	export let isNotContaineSpaceOrEnter = false;
	export let isRequired = false;

	import {
		emailValidator,
		noSpaceValidator,
		requiredValidator,
		noEnterValidator,
	} from "../sharedComponents/Validation/validators.js";
	import { createFieldValidator } from "../sharedComponents/Validation/validation.js";

	const [validity, validate] = createFieldValidator(
		isRequired ? requiredValidator() : () => true,
		isNotContaineSpaceOrEnter ? noSpaceValidator() : () => true,
		isNotContaineSpaceOrEnter ? noEnterValidator() : () => true
		// emailValidator()
	);

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="container" use:validate={value}>
	<pre
		aria-hidden="true"
		style="min-height: {minHeight}; max-height: {maxHeight};">{value + '\n'}</pre>

	<textarea
		class:field-danger={!$validity.valid}
		maxLength={maxLength !== 0 ? maxLength : undefined}
		bind:value
	/>
</div>

{#if !$validity.valid}
		<div class="validation-hint">
			INVALID - {$validity.message}
			<!-- {$validity.dirty} -->
		</div>
	{:else}
		<div />
	{/if}
