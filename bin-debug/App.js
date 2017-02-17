var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
    }
    App.getBitmap = function (imgName, x, y, isCenterAlign) {
        if (isCenterAlign === void 0) { isCenterAlign = true; }
        var bitmap = new egret.Bitmap(RES.getRes(imgName));
        if (isCenterAlign) {
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
        }
        bitmap.x = x;
        bitmap.y = y;
        return bitmap;
    };
    return App;
}());
App.stageWidth = 288;
App.stageHeight = 512;
App.bgSpeedNormalOffset = 2;
App.bgSpeedUpOffset = 4;
App.landOffset = 3;
App.pipeOffset = App.bgSpeedNormalOffset;
App.isSpeedUp = false;
App.birdVelocity = 0; //当前速度 px/f
App.birdAcceleration = 1; //加速度 px/f^2
App.birdTouchV = -8; //点击加速度
App.birdTouchR = -30;
App.birdRv = 0;
App.birdRa = 0.01;
App.isCheat = false; //是否作弊
App.testFlag = false;
__reflect(App.prototype, "App");
var GameStatus = (function () {
    function GameStatus() {
    }
    return GameStatus;
}());
GameStatus.INIT = 0;
GameStatus.READY = 1;
GameStatus.START = 2;
GameStatus.END = 3;
GameStatus.PAUSE = 4;
__reflect(GameStatus.prototype, "GameStatus");
//# sourceMappingURL=App.js.map