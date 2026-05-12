import {
	createRouter,
	createWebHistory
} from 'vue-router'
import pkIndexView from '../views/PK/pkIndexView'
import ranklistIndexView from '../views/ranklist/ranklistIndexView'
import recordIndexView from '../views/record/recordIndexView'
import errorView from '../views/errorView'
import UserBotIndexView from '../views/user/bot/UserBotIndexView'
import UserAccountLoginView from '@/views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '@/views/user/account/UserAccountRegisterView'
import store from '@/store/index';

const routes = [{
		path: "/",
		name: "home",
		redirect: "/pk/",
		meta: {
			requestAuth: true, //存储页面是否需要授权
		}
	},
	{
		path: "/pk/",
		name: "pk_index",
		component: pkIndexView,
		meta: {
			requestAuth: true, //存储页面是否需要授权
		}
	},
	{
		path: "/record/",
		name: "record_index",
		component: recordIndexView,
		meta: {
			requestAuth: true, //存储页面是否需要授权
		}
	},
	{
		path: "/ranklist/",
		name: "ranklist_index",
		component: ranklistIndexView,
		meta: {
			requestAuth: true, //存储页面是否需要授权
		}
	},
	{
		path: "/user/bot",
		name: "user_bot_index",
		component: UserBotIndexView,
		meta: {
			requestAuth: true, //存储页面是否需要授权
		}
	},
	{
		path: "/user/account/login/",
		name: "user_account_login",
		component: UserAccountLoginView,
		meta: {
			requestAuth: false, //存储页面是否需要授权
		}
	},
	{
		path: "/user/account/register/",
		name: "user_account_register",
		component: UserAccountRegisterView,
		meta: {
			requestAuth: false, //存储页面是否需要授权
		}
	},
	{
		path: "/404/",
		name: "error",
		component: errorView,
		meta: {
			requestAuth: false, //存储页面是否需要授权
		}
	},
	{
		path: "/:catchAll(.*)", //匹配所有字符，
		redirect: "/404/"
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})


//实现页面授权
// router.beforeEach((to, from, next) => {
// 	console.log(store.state.user.isLogin);
// 	if (to.meta.requestAuth && !store.state.user.isLogin) {
// 		next({ name: "user_account_login" });
// 	} else next();	//允许访问
// })


// router.beforeEach((to, from, next) => {

//   let flag = 1;
//   const jwt_token = localStorage.getItem("jwt_token");

//   if (jwt_token) {
//     store.commit("updateToken", jwt_token);
//     store.dispatch("getinfo", {
//       success() {
//       },
//       error() {
//         alert("token无效，请重新登录！");
//         router.push({ name: 'user_account_login' });
//       }
//     })
//   } else {
//     flag = 2;
//   }

//   if (to.meta.requestAuth && !store.state.user.isLogin) {
//     if (flag === 1) {
//       next();
//     } else {
//       alert("请先进行登录！");
//       next({name: "user_account_login"});
//     }
//   } else {
//     next();
//   }
// })





router.beforeEach(async (to, from, next) => {

	if (to.meta.requestAuth && !store.state.user.isLogin && !localStorage.getItem("jwt_token")) {
		console.log(localStorage.getItem("jwt_token"));
		next({
			name: "user_account_login"
		});
	} else {
		store.commit("updateToken", localStorage.getItem("jwt_token"));
		store.dispatch("getinfo", {
			success() {},
			error() {
				alert("token无效，请重新登录！");
				router.push({
					name: 'user_account_login'
				});
			}
		});
		next();

	}
})

export default router