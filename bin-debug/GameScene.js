var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this._gameStatue = GameStatus.INIT;
        _this._currentScore = 0;
        _this._stageW = App.stageWidth;
        _this._stageH = App.stageHeight;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameScene.getInstance = function () {
        if (!this._instance) {
            this._instance = new GameScene();
        }
        return this._instance;
    };
    GameScene.prototype.onAddToStage = function (event) {
        this.touchEnabled = true;
        this.creatGameScene();
        this.addEventListener(egret.Event.ENTER_FRAME, this.tick, this);
    };
    GameScene.prototype.creatGameScene = function () {
        var bgScene = new BackgroundScene();
        this._bgScene = bgScene;
        this.addChild(this._bgScene);
        var title = App.getBitmap('title_png', this._stageW / 2, this._stageH / 3);
        this._title = title;
        this._title.visible = true;
        this.addChild(this._title);
        var playBt = App.getBitmap('button_play_png', this._stageW / 2, this._stageH / 2 + 60);
        this._playBt = playBt;
        this._playBt.visible = true;
        this._playBt.touchEnabled = true;
        this._playBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameReady, this);
        this.addChild(this._playBt);
        var bird = new Bird();
        this._bird = bird;
        this.addChild(this._bird);
        var gameReadyTxt = App.getBitmap('text_ready_png', this._stageW >> 1, this._stageH / 3);
        this._gameReadyTxt = gameReadyTxt;
        this._gameReadyTxt.visible = false;
        this.addChild(this._gameReadyTxt);
        var tutorial = App.getBitmap('tutorial_png', this._stageW >> 1, this._stageH >> 1);
        this._tutorial = tutorial;
        this._tutorial.visible = false;
        this.addChild(this._tutorial);
    };
    GameScene.prototype.gameReady = function (e) {
        var _this = this;
        if (!this.hasEventListener(egret.Event.ENTER_FRAME))
            this.addEventListener(egret.Event.ENTER_FRAME, this.tick, this);
        this._gameStatue = GameStatus.READY;
        this._playBt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameReady, this);
        this._title.visible = false;
        this._playBt.visible = false;
        this._gameReadyTxt.visible = true;
        this._tutorial.visible = true;
        this._bird.init();
        egret.callLater(function () {
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.gameStart, _this);
        }, this);
    };
    GameScene.prototype.gameStart = function () {
        this._gameStatue = GameStatus.START;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
        this._gameReadyTxt.visible = false;
        this._tutorial.visible = false;
        this.tap();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
    };
    GameScene.prototype.gameOver = function () {
        this._gameStatue = GameStatus.START;
    };
    GameScene.prototype.tap = function () {
        this._bird.flying();
    };
    GameScene.prototype.tick = function () {
        switch (this._gameStatue) {
            case GameStatus.INIT:
                this._bird.waveUp();
                break;
            case GameStatus.READY:
                this._bird.waveUp();
                break;
            case GameStatus.START:
                this._bgScene.movePipe();
                if (!this._bird.update() || this._bgScene.isHitBird()) {
                    this._gameStatue = GameStatus.END;
                }
                break;
            case GameStatus.END:
                console.log('END');
                this.removeEventListener(egret.Event.ENTER_FRAME, this.tick, this);
                break;
        }
        this._bgScene.moveLand();
    };
    GameScene.prototype.getBirdPos = function () {
        return this._bird.getPos();
    };
    GameScene.prototype.getBridOffset = function () {
        return this._bird.getOffset();
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map