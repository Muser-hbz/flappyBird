var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Bird.prototype.onAddToStage = function (event) {
        this.creatBird();
    };
    Bird.prototype.creatBird = function () {
        var birdColor = ['green', 'blue', 'red'];
        var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("bird_json"), RES.getRes("bird_png"));
        //创建 MovieClip，将工厂生成的 MovieClipData 传入参数
        var birdMc = new egret.MovieClip(mcDataFactory.generateMovieClipData("Bird"));
        this._mc = birdMc;
        this.addChild(this._mc);
        //播放攻击动画
        this._mc.gotoAndPlay(birdColor[Math.floor(Math.random() * 3)], -1);
        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;
        this.x = App.stageWidth / 2;
        this.y = App.stageHeight / 2;
    };
    Bird.prototype.wave = function () {
        if (this.y >= (App.stageHeight / 2 - 10)) {
            this.y--;
        }
        // if(this.y >= (App.stageWidth/2 - 10)){
        // 	this.y += 1;
        // }
        console.log(this.y);
    };
    Bird.prototype.update = function () {
        App.birdVelocity = App.birdVelocity + App.birdAcceleration;
        for (var i = 0; i < Math.abs(App.birdVelocity); i++) {
            this.y += Math.abs(App.birdVelocity) / App.birdVelocity;
            if (this.hitFloor())
                return false;
        }
        return true;
    };
    Bird.prototype.flying = function () {
        if (this.y >= 0) {
            App.birdVelocity = App.birdTouchV;
        }
        egret.Tween.get(this).to({ totation: this.rotation - 30 }, 200);
    };
    Bird.prototype.hitFloor = function () {
        if (this.y + this.height >= App.landH) {
            return true;
        }
        return false;
    };
    return Bird;
}(egret.DisplayObjectContainer));
__reflect(Bird.prototype, "Bird");
//# sourceMappingURL=Bird.js.map