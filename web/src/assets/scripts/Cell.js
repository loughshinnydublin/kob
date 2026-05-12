//蛇所在格子
//canvas里横纵坐标与数组(画布)相反
export class Cell {
	constructor(r, c) {
			this.r = r;
			this.c = c;
			this.x = c + 0.5;	//蛇头，位于中心
			this.y = r + 0.5;
	}
}