class App {
	public static stageWidth:number = 288;
	public static stageHeight:number = 512;
	public static bgSpeedNormalOffset: number = 3;
    public static bgSpeedUpOffset: number = 6;
    public static bgOffset: number = App.bgSpeedNormalOffset;
    public static isSpeedUp: boolean = false;
	public static birdVelocity: number = 0;//当前速度 px/f
	public static birdAcceleration: number = 0.6;//加速度 px/f^2
	public static birdTouchV: number = -6;//点击加速度
	public static isCheat: boolean = false;//是否作弊
	public static testFlag: boolean = false;
	public static landH: number;

	public constructor() {
	}

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

class GameStatus{
	public static INIT: number = 0;
	public static READY: number = 1;
	public static START: number = 2;
	public static END: number = 3;
	public static PAUSE: number = 4;
}