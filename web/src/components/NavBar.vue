<template>
	<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
		<div class="container">
			<a class="navbar-brand text-white" href="/pk">home</a>
			<!-- 			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
				aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button> -->
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav me-auto mb-lg-0">
					<li class="nav-item">
						<a :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'" aria-current="page"
							href="/pk">对战</a>
					</li>
					<li class="nav-item">
						<a :class="route_name == 'record_index' ? 'nav-link active' : 'nav-link'"
							href="/record">对局列表</a>
					</li>
					<li class="nav-item">
						<a :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'"
							href="/ranklist">排行榜</a>
					</li>
				</ul>
				<span class="navbar-nav" v-if="$store.state.user.isLogin">
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-togg text-white" role="button" data-bs-toggle="dropdown"
							aria-expanded="false">
							{{ $store.state.user.username }}
						</a>

						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="/user/bot">我的bot</a></li>
							<li><router-link class="dropdown-item" v-on:click="logout"
									:to="{ name: 'user_account_login' }">退出</router-link></li>
						</ul>
					</li>
				</span>
				<span class="navbar-nav" v-else>
					<li class="nav-item">
						<router-link class="nav-link text-white" :to="{ name: 'user_account_login' }" role="button">
							登录
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link text-white" :to="{ name: 'user_account_register' }" role="button">
							注册
						</router-link>
					</li>
				</span>
			</div>
		</div>
	</nav>
</template>

<script>
import {
	computed
} from 'vue';
import {
	useRoute
} from 'vue-router';
import { useStore } from 'vuex';


export default {
	//类似主函数
	setup() {
		const route = useRoute();
		let route_name = computed(() => route.name)	//计算当前所在路径名称（route中定义name）


		const store = useStore();
		const logout = () => {
			store.dispatch("logout");
		}


		return {
			route_name,
			logout,
		}
	}
}
</script>

<style></style>