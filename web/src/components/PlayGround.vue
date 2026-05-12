<template>
	<div class="playground">
		<GameMapVue>
			
		</GameMapVue>
	</div>
</template>

<script>
	import GameMapVue from "./GameMap.vue";
	
	export default {
		components: {
			GameMapVue
		}
	}
</script>

<style scoped>
	div.playground {
		width: 60vw;
		height: 70vh;
		/* background-color: lightblue; */
		margin: 40px auto;
	}
</style>