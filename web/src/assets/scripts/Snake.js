// import {
// 	AcGameObject
// } from './AcGameObject';
// import {
// 	Cell
// } from './Cell';


// export class Snake extends AcGameObject {
// 	//传入信息和地图
// 	constructor(info, gamemap) {
// 		super();

// 		this.id = info.id;
// 		this.color = info.color;
// 		this.gamemap = gamemap;

// 		this.cells = [new Cell(info.r, info.c)]; //存放蛇的身体，cells[0]存放蛇头
// 		console.log(this.cells[0]);
// 		this.next_cell = null; //表示下一步的目标位置



// 		this.speed = 5; //每秒走5格



// 		this.direction = -1; //-1 没有指令，0123表示上右下左
// 		this.status = "idle"; //表示静止，move移动，die死亡，gamemap中判断状态


// 		//行、列偏移量
// 		this.dr = [-1, 0, 1, 0];
// 		this.dc = [0, 1, 0, -1];

// 		this.step = 0; //回合数
// 		this.eps = 1e-2; //允许的误差



// 	}

// 	start() {

// 	}

// 	set_direction(d) { //设置方向接口
// 		this.direction = d;
// 	}


// 	//将蛇的状态变为走下一步
// 	next_step() {

// 		const d = this.direction; //目标位置
// 		this.next_cell = new Cell(this.cells[0] + this.dr[d], this.cells[0] + this.dc[d]);
// 		console.log(this.next_cell);
// 		this.direction = -1; //清空操作
// 		this.status = "move"; //更新状态
// 		this.step++;


// 		const k = this.cells.length; //小球数量
// 		//每个小球向后移动，初始元素不变
// 		for (let i = k; i > 0; i--) {
// 			//js复制需要转json this.cells[i] = this.cells[i - 1] 错误
// 			this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
// 		}
// 		console.log(this.step);



// 	}



// 	update_move() {
// 		console.log("update_move cells[0]: ");
// 		console.log(this.cells[0]);
// 		// this.cells[0].x += this.speed * this.timedelta / 1000;	//水平移动路程 转换为毫秒

// 		//求每两球之间的距离和偏移量dxdy，用于计算θ角


// 		const dx = this.next_cell.x - this.cells[0].x;
// 		const dy = this.next_cell.y - this.cells[0].y;
// 		const distance = Math.sqrt(dx * dx + dy * dy);
// 		console.log("updatemove距离为" + distance);
// 		console.log("nextcellx= " + this.next_cell.x);
// 		console.log("nextcelly= " + this.next_cell.y);
// 		console.log("cell0x= " + this.cells[0].x);
// 		console.log("cell0y= " + this.cells[0].y);
// 		if (distance < this.eps) {
// 			//视为重合，不移动，状态为静止，添加一个新蛇头，删除旧蛇头
// 			this.cells[0] = this.next_cell;
// 			this.cells[0] = null;
// 			this.status = "idle";
// 		} else {
// 			const move_distance = this.speed * this.timedelta / 1000; //两帧之间移动距离
// 			this.cells[0].x += move_distance * dx / distance; //θ
// 			this.cells[0].y += move_distance * dx / distance;
// 		}



// 	}




// 	update() {
// 		if (this.status === "move") {
// 			console.log(this.status);
// 			this.update_move();
// 		}
// 		this.render(); //每帧更新一遍蛇
// 	}

// 	render() {
// 		const L = this.gamemap.L;
// 		const ctx = this.gamemap.ctx;


// 		//画蛇
// 		ctx.fillStyle = this.color;
// 		for (const cell of this.cells) {
// 			ctx.beginPath();
// 			ctx.arc(cell.x * L, cell.y * L, L / 2, 0, Math.PI * 2); //xy中点，半径，弧度
// 			ctx.fill();

// 		}
// 	}

// }



















import {
	AcGameObject
} from "./AcGameObject";
import {
	Cell
} from "./Cell";

export class Snake extends AcGameObject {
	constructor(info, gamemap) {
		super();

		this.id = info.id;
		this.color = info.color;
		this.gamemap = gamemap;

		this.cells = [new Cell(info.r, info.c)]; // 存放蛇的身体，cells[0]存放蛇头
		this.next_cell = null; // 下一步的目标位置

		this.speed = 5; // 蛇每秒走5个格子
		this.direction = -1; // -1表示没有指令，0、1、2、3表示上右下左
		this.status = "idle"; // idle表示静止，move表示正在移动，die表示死亡

		this.dr = [-1, 0, 1, 0]; // 4个方向行的偏移量
		this.dc = [0, 1, 0, -1]; // 4个方向列的偏移量

		this.step = 0; // 表示回合数
		this.eps = 1e-2; // 允许的误差

		this.eye_direction = 0;
		if (this.id === 1) this.eye_direction = 2; // 左下角的蛇初始朝上，右上角的蛇朝下

		this.eye_dx = [ // 蛇眼睛不同方向的x的偏移量
			[-1, 1],
			[1, 1],
			[1, -1],
			[-1, -1],
		];
		this.eye_dy = [ // 蛇眼睛不同方向的y的偏移量
			[-1, -1],
			[-1, 1],
			[1, 1],
			[1, -1],
		]
	}

	start() {

	}

	set_direction(d) {
		this.direction = d;
	}

	check_tail_increasing() { // 检测当前回合，蛇的长度是否增加
		if (this.step <= 10) return true;
		if (this.step % 3 === 1) return true;
		return false;
	}

	next_step() { // 将蛇的状态变为走下一步
		const d = this.direction;
		this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
		this.eye_direction = d;
		this.direction = -1; // 清空操作
		this.status = "move";
		this.step++;

		const k = this.cells.length;
		for (let i = k; i > 0; i--) {
			this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
		}

		if (!this.gamemap.check_valid(this.next_cell)) { // 下一步操作撞了，蛇瞬间去世
			this.status = "die";
		}
	}

	update_move() {
		const dx = this.next_cell.x - this.cells[0].x;
		const dy = this.next_cell.y - this.cells[0].y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < this.eps) { // 走到目标点了
			this.cells[0] = this.next_cell; // 添加一个新蛇头
			this.next_cell = null;
			this.status = "idle"; // 走完了，停下来

			if (!this.check_tail_increasing()) { // 蛇不变长
				this.cells.pop();
			}
		} else {
			const move_distance = this.speed * this.timedelta / 1000; // 每两帧之间走的距离
			this.cells[0].x += move_distance * dx / distance;
			this.cells[0].y += move_distance * dy / distance;

			if (!this.check_tail_increasing()) {
				const k = this.cells.length;
				const tail = this.cells[k - 1],
					tail_target = this.cells[k - 2];
				const tail_dx = tail_target.x - tail.x;
				const tail_dy = tail_target.y - tail.y;
				tail.x += move_distance * tail_dx / distance;
				tail.y += move_distance * tail_dy / distance;
			}
		}
	}

	update() { // 每一帧执行一次
		if (this.status === 'move') {
			console.log("update_move");
			this.update_move();
		}

		this.render();
	}

	render() {
		console.log("render");
		const L = this.gamemap.L;
		const ctx = this.gamemap.ctx;

		ctx.fillStyle = this.color;
		if (this.status === "die") {
			ctx.fillStyle = "white";
		}

		for (const cell of this.cells) {
			ctx.beginPath();
			ctx.arc(cell.x * L, cell.y * L, L / 2 * 0.8, 0, Math.PI * 2);
			ctx.fill();
		}

		for (let i = 1; i < this.cells.length; i++) {
			const a = this.cells[i - 1],
				b = this.cells[i];
			if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
				continue;
			if (Math.abs(a.x - b.x) < this.eps) {
				ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L);
			} else {
				ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8);
			}
		}

		ctx.fillStyle = "black";
		for (let i = 0; i < 2; i++) {
			const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.15) * L;
			const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.15) * L;

			ctx.beginPath();
			ctx.arc(eye_x, eye_y, L * 0.05, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}