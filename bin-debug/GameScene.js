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
        var scoreBmt = new egret.BitmapText();
        scoreBmt.font = RES.getRes('number_fnt');
        this._scoreNum = scoreBmt;
        this._scoreNum.text = '0';
        this._scoreNum.x = (this._stageW - this._scoreNum.width) / 2;
        this._scoreNum.y = this._stageH * 0.1;
        this.addChild(this._scoreNum);
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
        this.gameOverLayer();
    };
    GameScene.prototype.init = function () {
        this._title.visible = false;
        this._playBt.visible = false;
        this._gameReadyTxt.visible = true;
        this._tutorial.visible = true;
        this._scoreNum.visible = true;
        this._bird.init();
        this._bgScene.init();
        this._scoreNum.text = '0';
        this._currentScore = 0;
    };
    GameScene.prototype.gameReady = function () {
        var _this = this;
        if (!this.hasEventListener(egret.Event.ENTER_FRAME))
            this.addEventListener(egret.Event.ENTER_FRAME, this.tick, this);
        this._gameStatue = GameStatus.READY;
        this.init();
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
    GameScene.prototype.gameOverLayer = function () {
        var gameOverLayer = new egret.DisplayObjectContainer();
        gameOverLayer.touchEnabled = true;
        gameOverLayer.visible = false;
        gameOverLayer.width = this._stageW;
        this._gameOverLayer = gameOverLayer;
        this._gameOverLayer.y = this._stageH / 4;
        this.addChild(this._gameOverLayer);
        var gameOverTxt = new egret.Bitmap(RES.getRes('text_game_over_png'));
        gameOverTxt.x = (this._gameOverLayer.width - gameOverTxt.width) / 2;
        this._gameOverLayer.addChild(gameOverTxt);
        var scorePanel = new egret.DisplayObjectContainer();
        var panleBg = new egret.Bitmap(RES.getRes('score_panel_png'));
        scorePanel.addChild(panleBg);
        scorePanel.x = (this._gameOverLayer.width - scorePanel.width) / 2;
        scorePanel.y = gameOverTxt.height;
        this._gameOverLayer.addChild(scorePanel);
        var restartBt = new egret.Bitmap(RES.getRes('button_restart_png'));
        restartBt.x = (this._gameOverLayer.width - restartBt.width) / 2;
        restartBt.y = gameOverTxt.height + scorePanel.height;
        this._restartBt = restartBt;
        this._restartBt.touchEnabled = true;
        this._gameOverLayer.addChild(this._restartBt);
        this._restartBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
    };
    GameScene.prototype.showGameOver = function () {
        this._gameOverLayer.visible = true;
    };
    GameScene.prototype.restartGame = function (e) {
        this._gameOverLayer.visible = false;
        this.gameReady();
    };
    GameScene.prototype.gameOver = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.tick, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        this.showGameOver();
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
                this.gameOver();
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
    GameScene.prototype.addScore = function () {
        this._currentScore++;
        this._scoreNum.text = this._currentScore.toString();
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map