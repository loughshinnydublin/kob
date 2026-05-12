<template>
	<!-- 	<div>
		<div>
			Bot昵称：{{bot_name}}
		</div>
		<div>
			Bot战力：{{bot_rating}}
		</div>
	</div>	 -->
	<NavBar></NavBar>
	<router-view></router-view>
</template>

<script>
	// import $ from 'jquery';
	// import {ref} from 'vue';
	// export default {
	// 	name: "App",
	// 	setup: () => {
	// 		let bot_name = ref("");
	// 		let bot_rating = ref("");

	// 		$.ajax({
	// 			url: "http://localhost:8083/pk/getbotinfo/",
	// 			type: "get",
	// 			// success: resp => {
	// 			// 	console.log(resp);
	// 			// }
	// 			success: Response => {
	// 				console.log(Response);
	// 				bot_name.value = Response.name;
	// 				bot_rating.value = Response.rating;
	// 			}
	// 		})

	// 		return {
	// 			bot_name,
	// 			bot_rating
	// 		}
	// 	}
	// }
	import NavBar from './components/NavBar.vue';
	import 'bootstrap/dist/css/bootstrap.min.css'
	import 'bootstrap/dist/js/bootstrap'
	// import $ from 'jquery'

	export default {
		components: {
			NavBar
		},
		setup() {

			// $.ajax({
			// 	url: "http://localhost:8083/user/account/token/",
			// 	type: "post",
			// 	data: {
			// 		username: 'user1',
			// 		password: "passwords",
			// 	},
			// 	success(resp) {
			// 		console.log(resp);
			// 	},
			// 	error(resp) {
			// 		console.log(resp);
			// 	}
			// });
			
			// $.ajax({
			// 	url: "http://localhost:8083/user/account/info/",
			// 	type: "get",
			// 	headers: {
			// 		Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ODg5OTQwNGNiNTg0ZGI2YTE3OTMwNTJkYmJlMzVmNyIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTczNzkwMzgyNSwiZXhwIjoxNzM5MTEzNDI1fQ.LN6_tHj_z8zt3gzUmVtwWdBNBqNBzln9kDfkDW4wsLs",
			// 		// 在后端SecurityConfig中定义
			// 	},
			// 	success(resp) {
			// 		console.log(resp);
			// 	},
			// 	error(resp) {
			// 		console.log(resp);
			// 	}
			// });
			
			// $.ajax({
			// 	url: "http://localhost:8083/user/account/register/",
			// 	type: "post",
			// 	data: {
			// 		username: "user6",
			// 		password: "password6",
			// 		confirmedPassword: "password6",
			// 	},
			// 	success(resp) {
			// 		console.log(resp);
			// 	},
			// 	error(resp) {
			// 		console.log(resp);
			// 	}
			// });
		}
	}
</script>
<style>
	body {
		background-color: antiquewhite;
	}
</style>