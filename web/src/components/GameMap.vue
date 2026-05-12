<template>
	<div ref="parent" class="gamemap">
		<canvas ref="canvas" tabindex="0"> //tabindex输入用户操作
			<!-- 游戏对象渲染在画布中 -->

		</canvas>
	</div>
</template>

<script>
import {
	gameMap
} from "../assets/scripts/gameMap";
import {
	ref,
	onMounted	//组件挂载完执行的操作
} from "vue"; //用于定义变量

import { useStore } from "vuex";

export default {
	setup() {	//setup: () => {} 不会重新绑定this
		let parent = ref(null);
		let canvas = ref(null);

		const store = useStore();
		//传store 到gamemap.js
		onMounted(() => {
			new gameMap(canvas.value.getContext('2d'), parent.value, store)	//value取ctx, parent值, ctx用于修改画布参数
		});

		return {
			parent,
			canvas
		}
	}
}
</script>

<style scoped>
div.gamemap {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>