<template>
	<div class="matchground">

		<div class="div row">
			<div class="col-6" style="margin-top: 20px;">
				<div class="user-photo"> <img :src="$store.state.user.photo" alt="" /></div>
				<div class="user-username"> {{ $store.state.user.username }} </div>
			</div>
			<div class="col-6" style="margin-top: 20px;">
				<div class="user-photo"> <img :src="$store.state.pk.opponent_photo" alt="" /></div>
				<div class="user-username"> {{ $store.state.pk.opponent_username }} </div>
			</div>
		</div>

		<div class="col-12" style="text-align: center; padding-top: 10vh;">
			<button type="button" class="btn btn-warning btn-lg"
				@click="click_match_bot_button()">{{ match_bot_info }}</button>
		</div>

	</div>
</template>

<script>
	import {
		ref
	} from 'vue';
	import {
		useStore
	} from 'vuex';


	export default {
		setup() {
			let match_bot_info = ref("开始匹配");
			const store = useStore();

			const click_match_bot_button = () => {
				if (match_bot_info.value === "开始匹配") {
					match_bot_info.value = "取消";
					//开始匹配
					store.state.pk.socket.send(JSON.stringify({
						event: "start-matching",
					}));
				} else {
					//取消匹配
					match_bot_info.value = "开始匹配";
					//socket 的 send 向后端发送一个json转换的字符串，onmessage接受
					store.state.pk.socket.send(JSON.stringify({
						event: "stop-matching",
					}));
				}
			}




			return {
				match_bot_info,
				click_match_bot_button
			}
		}
	}
</script>

<style scoped>
	div.matchground {
		width: 60vw;
		height: 70vh;
		background-color: lightblue;
		margin: 40px auto;
	}

	div.user-photo {
		text-align: center;
	}

	div.user-photo>img {
		border-radius: 50%;
	}

	div.user-username {
		text-align: center;
		font-size: 24px;
		font-weight: bold;
	}
</style>