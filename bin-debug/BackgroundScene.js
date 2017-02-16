var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BackgroundScene = (function (_super) {
    __extends(BackgroundScene, _super);
    function BackgroundScene() {
        var _this = _super.call(this) || this;
        _this.creatScene();
        return _this;
    }
    BackgroundScene.prototype.creatScene = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes('bg_day_png');
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);
        var land1 = new egret.Bitmap(RES.getRes('land_png'));
        var land2 = new egret.Bitmap(RES.getRes('land_png'));
        land1.x = 0;
        land1.y = bg.height - land1.height;
        land2.x = land2.width;
        land2.y = land1.y;
        App.landH = land1.y;
        this.addChild(land1);
        this.addChild(land2);
        this._landArr = [land1, land2];
    };
    BackgroundScene.prototype.moveLand = function () {
        var offset = App.bgOffset;
        var land1 = this._landArr[0];
        var land2 = this._landArr[1];
        land1.x -= offset;
        land2.x -= offset;
        if (land2.x == 0)
            land1.x = App.stageWidth;
        if ((land1.x == 0))
            land2.x = App.stageWidth;
    };
    return BackgroundScene;
}(egret.DisplayObjectContainer));
__reflect(BackgroundScene.prototype, "BackgroundScene");
//# sourceMappingURL=BackgroundScene.js.map