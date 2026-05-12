<template>
	<PlayGround v-if="$store.state.pk.status === 'playing'" />
	<MatchGround v-if="$store.state.pk.status === 'matching'" />
</template>

<script>
import {
	onMounted,
	onUnmounted
} from 'vue'; //组件挂载、卸载之后执行的函数
import PlayGround from '../../components/PlayGround.vue'
import {
	useStore
} from 'vuex';
import MatchGround from '@/components/MatchGround.vue'




export default {
	components: {
		PlayGround,
		MatchGround
	},
	setup() {
		const store = useStore();
		const socketUrl = `ws://localhost:8083/websocket/${store.state.user.token}/`;


		let socket = null;
		//前端向后端建立链接，当前组件加载后
		onMounted(() => {

			//排除userid不存在，打印出来用户id未知，token已知，很奇怪。。感觉是getinfo异步执行了，但是不会改
			// if (!store.state.user || !store.state.user.id) {
			// console.log(store.state.user);
			// console.error("用户 ID 未定义，无法建立 WebSocket 连接");
			// return;
			// }

			//假设有对手
			store.commit("updateOpponent", {
				username: "我的对手",
				photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
			}),

				console.log(store.state.pk.opponent_username);

			socket = new WebSocket(socketUrl);

			socket.onopen = () => {
				console.log("connected!");

				store.commit("updateSocket", socket);
			}

			//后端向前端以json形式发送数据，在msg.data 中
			socket.onmessage = msg => {
				const data = JSON.parse(msg.data);
				// console.log(data);
				console.log(data.event);

				if (data.event === "start-matching") {
					store.commit("updateOpponent", {
						username: data.opponent_username,
						photo: data.opponent_photo
					});
					setTimeout(() => {
						store.commit("updateStatus", "playing");
					}, 300);
					console.log("startmatching");
					//画地图
					store.commit("updateGamemap", data.gamemap);
				}
			}

			socket.onclose = () => {
				console.log("disconnected!");
				store.commit("updateStatus", "matching");
			}
		});

		onUnmounted(() => {
			socket.close();
		})

	}
}
</script>

<style></style>