<div class={'panel ' + className} class:dense class:active {...attrs} use:events>
	<button class="header" class:rotate {disabled} on:click={onclick}>
		<span>{name}</span>
		<slot name="icon">
			<i class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					fill="currentColor"
				>
					<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
				</svg>
			</i>
		</slot>
	</button>

	{#if active}
		<div class="content" transition:slide|local={{ duration: 250 }}>
			<slot />
		</div>
	{/if}
</div>

<script>
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { bind, current_component } from 'svelte/internal';
	import { getEventsAction } from './events';
	const events = getEventsAction(current_component);
	const dispatch = createEventDispatcher();
	export { className as class, name, group, dense, rotate, expand, disabled };
	let className = '';
	let name = '?';
	let group = '';
	let dense = false;
	let rotate = true;
	let expand = false;
	let disabled = false;
	let attrs = {};
	$: {
		/* eslint-disable no-unused-vars */
		const { name, group, dense, rotate, expand, disabled, ...other } = $$props;
		delete other.class;
		attrs = other;
	}
	$: if (expand) {
		group = name;
	}
	$: active = group === name;
	$: dispatch('change', { expanded: active, name });
	function onclick(e) {
		group = group === name ? '' : name;
		e.target.classList.remove('focus-visible');
	}
</script>
