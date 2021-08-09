<div
	class={`text-field ${outlined && !filled ? 'outlined' : 'baseline'} ${className}`}
	class:filled
	class:dirty
	class:disabled
	{style}
	{title}
>
	<input class="input" bind:value use:events {...attrs} />

	<div class="focus-ring" />
	<div class="label">
		{label}
		{#if required && !value.length}
			<span class="required">*</span>
		{/if}
	</div>
	{#if !outlined || filled}
		<div class="input-line" />
		<div class="focus-line" />
	{/if}

	{#if !!message || !!error}
		<div class="help" class:persist={messagePersist} class:error>
			<div class="message">{error || message}</div>
		</div>
	{/if}
</div>

<script>
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './events';
	const events = getEventsAction(current_component);
	export {
		value,
		disabled,
		required,
		className as class,
		style,
		title,
		label,
		outlined,
		filled,
		messagePersist,
		message,
		error,
	};
	let value = '';
	let disabled = false;
	let required = false;
	let className = '';
	let style = null;
	let title = null;
	let label = '';
	let outlined = false;
	let filled = false;
	let messagePersist = false;
	let message = '';
	let error = '';
	let placeholder;
	let attrs = {};
	$: {
		/* eslint-disable no-unused-vars */
		const {
			value,
			style,
			title,
			label,
			outlined,
			filled,
			messagePersist,
			message,
			error,
			...other
		} = $$props;
		!other.readonly && delete other.readonly;
		!other.disabled && delete other.disabled;
		delete other.class;
		other.type = allowedTypes.indexOf(other.type) < 0 ? 'text' : other.type;
		placeholder = other.placeholder;
		attrs = other;
	}
	$: dirty =
		(typeof value === 'string' && value.length > 0) ||
		typeof value === 'number' ||
		placeholder ||
		dirtyTypes.indexOf(attrs.type) >= 0;
	const allowedTypes = [
		'date',
		'datetime-local',
		'email',
		'month',
		'number',
		'password',
		'search',
		'tel',
		'text',
		'time',
		'url',
		'week',
	];
	const dirtyTypes = ['date', 'datetime-local', 'month', 'time', 'week'];
</script>