const AC_GAME_OBJECTS = []; //存储所有游戏变量


//基类，其他类都继承该类
export class AcGameObject {
	constructor() {
		AC_GAME_OBJECTS.push(this);
		this.timedelta = 0; //与上一帧的时间间隔，用于表示速度
		this.has_called_start = false; //记录是否执行过



	}

	start() { //只执行一次

	}

	update() { //每一帧执行一次，除第一帧之外

	}

	on_destroy() { //删除之前执行

	}


	destroy() { //遍历变量删除当前对象
		this.on_destroy();
		for (let i in AC_GAME_OBJECTS) {
			const obj = AC_GAME_OBJECTS[i];
			if (obj === this) {
				AC_GAME_OBJECTS.splice(i);
				break;
			}
		}
	}
}

let last_timestep; //上一次执行的时刻

const step = timestamp => { //传入当前时刻
	for(let obj of AC_GAME_OBJECTS)	//of遍历值，in遍历下标
	{
		if(!obj.has_called_start) {
			obj.has_called_start = true;
			obj.start();
		} else {
			obj.timedelta = timestamp - last_timestep;
			obj.update();
		}
	}
	//更新timestamp
	last_timestep = timestamp;
	
	requestAnimationFrame(step);	//第一帧执行start, 之后执行update
}

requestAnimationFrame(step) //传入的函数在每次浏览器刷新之前执行一遍