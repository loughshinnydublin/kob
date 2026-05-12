import {
	AcGameObject
} from "./AcGameObject"; //export引用需要用大括号，default不用

import {
	Wall
} from './Wall';

import {
	Snake
} from "./Snake.js";



export class gameMap extends AcGameObject {
	constructor(ctx, parent, store) { //画布，画布父元素，用于动态修改长宽
		super();

		this.ctx = ctx;
		this.parent = parent;
		this.L = 0; //一个单位长度，用于表示绝对距离
		this.store = store;


		this.rows = 13;
		this.cols = 14;


		this.innner_walls_count = 10;
		this.walls = []; //所有墙的集合


		this.snakes = [
			new Snake({
				id: 0,
				color: "#4876EC",
				r: this.rows - 2,
				c: 1
			}, this),
			new Snake({
				id: 1,
				color: "#F94848",
				r: 1,
				c: this.cols - 2
			}, this),
		];

	}

	//判断两点是否连通,后端实现
	// check_connectivity(g, sx, sy, tx, ty) {
	// 	if (sx == tx && sy == ty) return true;

	// 	g[sx][sy] = true;

	// 	let dx = [0, 1, 0, -1];
	// 	let dy = [1, 0, -1, 0];

	// 	for (let i = 0; i < 4; i++) {
	// 		let x = dx[i] + sx;
	// 		let y = dy[i] + sy;
	// 		if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) {
	// 			return true;
	// 		}
	// 	}

	// 	return false;

	// }

	create_walls() {	//后端实现
		// new Wall(0,0,this); //注意构造器中的参数
		// const g = []; //表示是否有墙
		// for (let r = 0; r < this.rows; r++) {
		// 	for (let c = 0; c < this.cols; c++) {
		// 		g[r] = [];
		// 		g[r][c] = false;
		// 	}
		// }


		// //给四周加上墙
		// for (let r = 0; r < this.rows; r++) {
		// 	g[r][0] = g[r][this.cols - 1] = true;
		// }

		// for (let c = 0; c < this.cols; c++) {
		// 	g[0][c] = g[this.rows - 1][c] = true;
		// }



		// //生成墙
		// for (let i = 0; i < this.innner_walls_count / 2; i++) {
		// 	for (let j = 0; j < 1000; j++) { //随机1000次
		// 		let r = parseInt(Math.random() * this.rows);
		// 		let c = parseInt(Math.random() * this.cols);
		// 		if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue; //中心对称，排除已有的墙
		// 		if (r == this.rows - 2 && c == 1 || c == this.cols - 2 && r == 1) continue; //排除出生点


		// 		g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true; //使中心对称
		// 		break;
		// 	}
		// }



		// const copy_g = JSON.parse(JSON.stringify(g)); //深度复制一个图
		// if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false; //检查连通性，bfs


		const g = this.store.state.pk.gamemap;



		//加入集合
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				if (g[r][c]) {
					this.walls.push(new Wall(r, c, this));
				}
			}
		}

		// return true;
	}


	//监听用户输入
	add_listening_events() {
		this.ctx.canvas.focus();


		const [snake0, snake1] = this.snakes;
		this.ctx.canvas.addEventListener("keydown", e => {
			console.log(e.key);
			if (e.key === "w") snake0.set_direction(0);
			else if (e.key === "a") snake0.set_direction(3);
			else if (e.key === "s") snake0.set_direction(2);
			else if (e.key === "d") snake0.set_direction(1);
			else if (e.key === "ArrowUp") snake1.set_direction(0);
			else if (e.key === "ArrowDown") snake1.set_direction(2);
			else if (e.key === "ArrowLeft") snake1.set_direction(3);
			else if (e.key === "ArrowRight") snake1.set_direction(1);

		});

	}



	start() { //尝试1000次，合法就继续

		this.create_walls();
		//随机在后端执行
		// for (let i = 0; i < 1000; i++) {
		// if (this.create_walls()) break;
		// }

		this.add_listening_events();
	}

	check_ready() {
		//是否能够进入下一回合
		for (const snake of this.snakes) {
			if (snake.status !== "idle") return false; //正在移动或者死亡
			if (snake.direction === -1) return false; //没有进入下一步指令
		}
		return true;

	}


	// next_step() {  // 让两条蛇进入下一回合
	//     for (const snake of this.snakes) {
	//         snake.next_step();
	//     }
	// }

	check_valid(cell) {  // 检测目标位置是否合法：没有撞到两条蛇的身体和障碍物
		for (const wall of this.walls) {
			if (wall.r === cell.r && wall.c === cell.c)
				return false;
		}

		for (const snake of this.snakes) {
			let k = snake.cells.length;
			if (!snake.check_tail_increasing()) {  // 当蛇尾会前进的时候，蛇尾不要判断
				k--;
			}
			for (let i = 0; i < k; i++) {
				if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
					return false;
			}
		}

		return true;
	}








	update_size() { //每帧更新地图边长(单元格为单位更新，为了避免出现白缝取整形)
		this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this
			.rows)); //求<div>长宽
		this.ctx.canvas.width = this.L * this.cols; //单位长度 * 列数
		this.ctx.canvas.height = this.L * this.rows;
	}

	render() {
		//画地图
		// this.ctx.fillStyle = 'green';
		// this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);	//对角坐标，边长
		const color_even = '#caff60',
			color_odd = "#AAD751";
		//一个格子一个格子填色
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.cols; c++) {
				if ((c + r) % 2 == 0) this.ctx.fillStyle = color_even;
				else this.ctx.fillStyle = color_odd;
				this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
			}

		}
	}


	next_step() { //让两条蛇进入下个回合
		for (const obj_snake of this.snakes) {
			obj_snake.next_step();
		}
		console.log("nextstep");
	}


	update() {
		this.update_size();
		if (this.check_ready()) {
			this.next_step();
		}


		this.render();
	}





}