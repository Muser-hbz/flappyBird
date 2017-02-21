class App {
	public static stageWidth: number = 288;
	public static stageHeight: number = 512;
	public static bgSpeedNormalOffset: number = 2;
	public static bgSpeedUpOffset: number = 4;
	public static landOffset: number = 3;
	public static pipeOffset: number = App.bgSpeedNormalOffset;
	public static isSpeedUp: boolean = false;
	public static birdVelocity: number = 0;//当前速度 px/f
	public static birdAcceleration: number = 1;//加速度 px/f^2
	public static birdTouchV: number = -8;//点击加速度
	public static birdTouchR: number = -30;
	public static birdRv: number = 0;
	public static birdRa: number = 0.01;

	public static isCheat: boolean = false;//是否作弊
	public static testFlag: boolean = false;
	public static landH: number;

	public static getBitmap(imgName: string, x: number, y: number, isCenterAlign: boolean = true): egret.Bitmap {
		var bitmap = new egret.Bitmap(RES.getRes(imgName));
		if (isCenterAlign) {
			bitmap.anchorOffsetX = bitmap.width / 2;
			bitmap.anchorOffsetY = bitmap.height / 2;
		}
		bitmap.x = x;
		bitmap.y = y;
		return bitmap;
	}
}

class GameStatus {
	public static INIT: number = 0;
	public static READY: number = 1;
	public static START: number = 2;
	public static END: number = 3;
	public static PAUSE: number = 4;
}