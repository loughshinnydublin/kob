<template>
	<div class="container">
		<div class="row">
			<div class="col-3">
				<div class="card" style="margin-top: 20px;">
					<div class="crad-body">
						<img :src="$store.state.user.photo" alt="" style="width: 100%;" />

					</div>
				</div>
			</div>

			<div class="col-9">
				<div class="card" style="margin-top: 20px;">
					<div class="card-header">
						<span style="font-size: 130%;">我的bot</span>
						<button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
							data-bs-target="#add-bot-btn">
							创建bot
						</button>

						<!-- CREATEBOT_Modal -->
						<div class="modal fade" id="add-bot-btn" data-bs-backdrop="static" data-bs-keyboard="false"
							tabindex="-1" aria-hidden="true">
							<div class="modal-dialog modal-xl">
								<div class="modal-content">
									<div class="modal-header">
										<h1 class="modal-title fs-5" id="staticBackdropLabel">创建bot</h1>
										<button type="button" class="btn-close" data-bs-dismiss="modal"
											aria-label="Close"></button>
									</div>
									<div class="modal-body">
										<div class="mb-3">
											<label for="add-bot-title" class="form-label">名称</label>
											<input v-model="botadd.title" type="text" class="form-control"
												id="add-bot-title" placeholder="bot名称">
										</div>
										<div class="mb-3">
											<label for="add-bot-description" class="form-label">bot简介
											</label>
											<textarea v-model="botadd.description" class="form-control"
												id="add-bot-description" rows="3" placeholder="bot简介"></textarea>
										</div>
										<div class="mb-3">
											<label for="add-bot-code" class="form-label">bot代码
											</label>
											<VAceEditor v-model:value="botadd.content" @init="editorInit" lang="c_cpp"
												theme="textmate" style="height: 300px" />

										</div>
									</div>
									<div class="modal-footer">
										<div class="error-message">{{botadd.error_message}}</div>
										<button type="button" class="btn btn-secondary"
											data-bs-dismiss="modal">取消</button>
										<button type="button" class="btn btn-primary" @click="add_bot">完成</button>
									</div>
								</div>
							</div>
						</div>


					</div>

					<div class="card-body">

						<table class="table table-striped table-hover">
							<thead>
								<tr>
									<th>名称</th>
									<th>创建时间</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="bot in bots" :key="bot.id">
									<td>{{ bot.title }}</td>
									<td>{{ bot.createtime }}</td>

									<!-- UPDATEBOT_Modal -->
									<!-- 每一行对应一个模态框，绑定不同的botid -->
									<div class="modal fade" :id="'update-bot-modal-' + bot.id" data-bs-backdrop="static"
										data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
										<div class="modal-dialog modal-xl">
											<div class="modal-content">
												<div class="modal-header">
													<h1 class="modal-title fs-5">创建bot</h1>
													<button type="button" class="btn-close" data-bs-dismiss="modal"
														aria-label="Close"></button>
												</div>
												<div class="modal-body">
													<div class="mb-3">
														<label for="add-bot-title" class="form-label">名称</label>
														<input v-model="bot.title" type="text" class="form-control"
															id="add-bot-title" placeholder="bot名称">
													</div>
													<div class="mb-3">
														<label for="add-bot-description" class="form-label">bot简介
														</label>
														<textarea v-model="bot.description" class="form-control"
															id="add-bot-description" rows="3"
															placeholder="bot简介"></textarea>
													</div>
													<div class="mb-3">
														<label for="add-bot-code" class="form-label">bot代码
														</label>
														<VAceEditor v-model:value="bot.content" @init="editorInit"
															lang="c_cpp" theme="textmate" style="height: 300px" />

													</div>
												</div>
												<div class="modal-footer">
													<div class="error-message">{{bot.error_message}}</div>
													<button type="button" class="btn btn-secondary"
														data-bs-dismiss="modal">取消</button>
													<button type="button" class="btn btn-primary"
														@click="update_bot(bot)">保存修改</button>
												</div>
											</div>
										</div>
									</div>


									<td><button type="button" class="btn btn-secondary" data-bs-toggle="modal"
											:data-bs-target="'#update-bot-modal-' + bot.id">修改</button></td>
									<td><button type="button" class="btn btn-danger" data-bs-toggle="modal"
											:data-bs-target="'#remove-bot-modal-' + bot.id">删除</button>
									</td>





									<!-- REMOVE_Modal -->
									<div class="modal fade" :id="'remove-bot-modal-' + bot.id" data-bs-backdrop="static"
										data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
										<div class="modal-dialog modal-sm">
											<div class="modal-content">
												<div class="modal-header">
													<h1 class="modal-title fs-5">确认删除</h1>
													<button type="button" class="btn-close" data-bs-dismiss="modal"
														aria-label="Close"></button>
												</div>

												<div class="modal-footer">
													<div class="error-message">{{ bot.error_message }}</div>
													<button type="button" class="btn btn-secondary"
														data-bs-dismiss="modal">取消</button>
													<button type="button" class="btn btn-primary"
														@click="remove_bot(bot)">确认</button>
												</div>
											</div>
										</div>
									</div>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		reactive,
		ref
	} from 'vue';
	import $ from 'jquery';
	import {
		useStore
	} from 'vuex'; //从全局变量读取token
	import {
		Modal
	} from 'bootstrap/dist/js/bootstrap';
	import {
		VAceEditor
	} from 'vue3-ace-editor';
	import ace from 'ace-builds';

	export default {

		components: {
			VAceEditor,
		},

		setup() {

			ace.config.set(
				"basePath",
				"https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")

			//绑定一个对象
			const botadd = reactive({
				title: "",
				description: "",
				content: "",
				error_message: "",
			});
			const store = useStore();
			let bots = ref([]); //bot列表


			const refresh_bots = () => {
				$.ajax({
					url: "http://localhost:8083/user/bot/getlist/",
					type: "get",
					headers: {
						Authorization: "Bearer " + store.state.user.token,

					},
					success(resp) {
						bots.value = resp;
					},
					error(resp) {
						console.log(resp);
					}
				})
			}

			refresh_bots();

			const add_bot = () => {
				botadd.error_message = "";
				$.ajax({
					url: "http://localhost:8083/user/bot/add/",
					type: "post",
					data: {
						//reactive不用加value
						title: botadd.title,
						description: botadd.description,
						content: botadd.content,
					},
					headers: {
						Authorization: "Bearer " + store.state.user.token,
					},
					success(resp) {
						if (resp.error_message == "success") {
							//成功之后要清空表格内容，关闭模态框
							botadd.title = "";
							botadd.description = "";
							botadd.content = "";
							//id之前加#
							Modal.getInstance("#add-bot-btn").hide();

							refresh_bots();
							console.log(resp.error_message);


						} else {
							botadd.error_message = resp.error_message;
						}
					}
				})
			}

			const remove_bot = (bot) => {
				$.ajax({
					url: "http://localhost:8083/user/bot/remove/",
					type: "post",
					data: {
						bot_id: bot.id,
					},
					headers: {
						Authorization: "Bearer " + store.state.user.token,
					},
					success(resp) {
						if (resp.error_message === "success") {
							console.log(resp);
							Modal.getInstance('#remove-bot-modal-' + bot.id).hide();
							refresh_bots();
						}
					},
				})
			}

			const update_bot = (bot) => {
				$.ajax({
					url: "http://localhost:8083/user/bot/update/",
					type: "post",
					data: {
						bot_id: bot.id, //列表中bot的id
						title: bot.title,
						description: bot.description,
						content: bot.content,
					},
					headers: {
						Authorization: "Bearer " + store.state.user.token,

					},
					success(resp) {
						if (resp.error_message === "success") {
							Modal.getInstance('#update-bot-modal-' + bot.id).hide();

							refresh_bots();
							console.log(resp.error_message);
						} else {
							console.log(resp.error_message);
						}
					}
				})
			}


			return {
				bots,
				botadd,
				add_bot,
				remove_bot,
				update_bot
			}










		}
	}
</script>

<style scoped>
	.error-message {
		color: red;
	}
</style>