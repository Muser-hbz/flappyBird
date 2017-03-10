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
        _this._angle = 0;
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
        this._mc.anchorOffsetX = this._mc.x >> 1;
        this._mc.anchorOffsetY = this._mc.y >> 1;
        this.addChild(this._mc);
        //播放动画
        this._mc.gotoAndPlay(birdColor[Math.floor(Math.random() * 3)], -1);
        this.anchorOffsetX = this.width >> 1;
        this.anchorOffsetY = this.height >> 1;
        this.x = App.stageWidth / 2;
        this.y = App.stageHeight / 2 - 40;
    };
    Bird.prototype.init = function () {
        this.x = App.stageWidth / 4;
        this.y = App.stageHeight / 2 - 20;
    };
    Bird.prototype.waveUp = function () {
        this.y = this.y + Math.sin(this._angle) * 2;
        this._angle = (this._angle + 0.15) % (2 * Math.PI);
    };
    Bird.prototype.update = function () {
        App.birdVelocity += App.birdAcceleration;
        App.birdRv += App.birdRa;
        for (var i = 0; i < Math.abs(App.birdVelocity); i++) {
            this.y += Math.abs(App.birdVelocity) / App.birdVelocity;
            // if(this.rotation < 80 )	this.rotation += Math.abs(App.birdRv) / App.birdRv;
            if (this.hitFloor()) {
                this.rotation = 90;
                return false;
            }
        }
        return true;
    };
    Bird.prototype.flying = function () {
        if (this.y >= 0) {
            App.birdVelocity = App.birdTouchV;
        }
        /*if(this.rotation < 90){
            this.rotation = App.birdTouchR;
        }*/
    };
    Bird.prototype.hitFloor = function () {
        if (this.y + this.height >= App.landH) {
            return true;
        }
        return false;
    };
    Bird.prototype.getPos = function () {
        return [this.x, this.y];
    };
    Bird.prototype.getOffset = function () {
        return this.width / 2;
    };
    return Bird;
}(egret.DisplayObjectContainer));
__reflect(Bird.prototype, "Bird");
//# sourceMappingURL=Bird.js.map