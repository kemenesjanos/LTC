<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>


<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}" style="width: 10%;">
	<slot></slot>
</button>