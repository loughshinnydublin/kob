import $ from 'jquery';
// import router from '@/router/index';

export default {
	state: {
		id: "",
		username: "",
		photo: "",
		token: "",
		// token: localStorage.getItem("jwt_token"),
		isLogin: false,

	},
	getters: {},
	mutations: {
		updateUser(state, user) {
			state.id = user.id;
			state.username = user.username;
			state.photo = user.photo;
			state.isLogin = user.isLogin;
			console.log(user);
		},
		updateToken(state, token) {
			state.token = token;
		},
		logout(state) {
			state.id = "";
			state.username = "";
			state.photo = "";
			state.token = "";
			state.isLogin = false;
		}
	},
	//修改state的函数
	actions: {
		login(context, data) {
			$.ajax({
				url: "http://localhost:8083/user/account/token/",
				type: "post",
				data: {
					username: data.username,
					password: data.password,
				},
				success: function(resp) {
					//actions调用mutation函数需要commit
					if (resp.error_message === "success") //在后端定义
					{
						localStorage.setItem("jwt_token", resp.token); //持久化登录
						context.commit("updateToken", resp.token);
						console.log(resp);
						// router.push({ name: "home" });	//在view跳转没反应（因为没调用success回调函数
						data.success(resp);
					} else {
						data.error(resp);
						console.log(resp);
					}
				},
				error(resp) {
					data.error(resp);
					console.log(resp);
				}
			});
		},

		getinfo(context, data) {
			$.ajax({
				url: "http://localhost:8083/user/account/info/",
				type: "get",
				headers: {
					Authorization: "Bearer " + context.state.token, //context改成store?
					// 在后端SecurityConfig中定义
				},
				// async: false,
				success(resp) {
					if (resp.error_message === "success") {
						context.commit("updateUser", {
							...resp, //解构resp中的信息，放在当前的对象中
							isLogin: true,
						});
						data.success(resp);
						// console.log(resp);
					} else {
						data.error(resp);
					}
				},
				error(resp) {
					data.error(resp);
				}
			})
		},

		logout(context) {
			localStorage.removeItem("jwt_token");
			context.commit("logout");
		},

	},
	modules: {}
}