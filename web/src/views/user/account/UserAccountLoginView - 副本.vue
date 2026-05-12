<template>
	<ContentField>
		<div class="row justify-content-md-center">
			<div class="col-3">
				<form @submit.prevent="login">
					<!-- .prevent防止组件之间传递 -->
					<div class="mb-3">
						<label for="username" class="form-label">username</label>
						<input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
					</div>
					<div class="mb-3">
						<label for="password" class="form-label">Password</label>
						<input v-model="password" type="password" class="form-control" id="password"
							placeholder="请输入密码">
					</div>

					<div class="error-message">{{ error_message }}</div>
					<button type="submit" class="btn btn-primary">login</button>
				</form>
			</div>
		</div>
		
		<div id="carouselExample" class="carousel slide">
		  <div class="carousel-inner">
		    <div class="carousel-item active">
		      <img src="..." class="d-block w-100" alt="...">
		    </div>
		    <div class="carousel-item">
		      <img src="..." class="d-block w-100" alt="...">
		    </div>
		    <div class="carousel-item">
		      <img src="..." class="d-block w-100" alt="...">
		    </div>
		  </div>
		  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
		    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		    <span class="visually-hidden">Previous</span>
		  </button>
		  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
		    <span class="carousel-control-next-icon" aria-hidden="true"></span>
		    <span class="visually-hidden">Next</span>
		  </button>
		</div>
	</ContentField>
</template>

<script>
import ContentField from '@/components/ContentField';
import {
	useStore
} from 'vuex';
import {
	ref
} from 'vue';
import router from '@/router';




export default {
	components: {
		ContentField
	},

	setup() {
		const store = useStore(); //全局变量

		let username = ref('');
		let password = ref('');
		let error_message = ref('');
		//点击提交触发
		const login = () => {
			store.dispatch("login", {
				username: username.value, //ref取值.value
				password: password.value,
				success: function() {
					store.dispatch("getinfo", {
						success: function(){
							router.push({ name: "home" });
							console.log(store.state.user);
						}
					})
					//不知道为什么不执行
				},
				error() {
					error_message.value = "用户名或密码错误";
				}
			}) //调用action里的函数dispatch
		}

		return {
			username,
			password,
			error_message,
			login,
		}
	}
}
</script>

<style scoped>
div.error-message {
	color: red;
}
</style>