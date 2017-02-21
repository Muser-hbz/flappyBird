class GameScene extends egret.DisplayObjectContainer {

	private static _instance: GameScene;

	private _gameStatue: number = GameStatus.INIT;

	private _mainMenu: egret.Bitmap;
	private _title: egret.Bitmap;
	private _gameOverTxt: egret.Bitmap;

	private _pauseBt: egret.Bitmap;
	private _restartBt: egret.Bitmap;
	private _playBt: egret.Bitmap;
	private _speedBt: egret.Bitmap;
	private _scoreNum: egret.BitmapText;
	private _currentScore: number = 0;

	private _stageW: number = App.stageWidth;
	private _stageH: number = App.stageHeight;


	private _bgScene: BackgroundScene;
	private _bird: Bird;

	private _gameReadyTxt: egret.Bitmap;
	private _tutorial: egret.Bitmap;

	private _gameOverLayer: egret.DisplayObjectContainer;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	public static getInstance(): GameScene {
		if (!this._instance) {
			this._instance = new GameScene();
		}
		return this._instance;
	}

	private onAddToStage(event: egret.Event): void {
		this.touchEnabled = true;
		this.creatGameScene();
		this.addEventListener(egret.Event.ENTER_FRAME, this.tick, this);
	}

	private creatGameScene() {
		var bgScene = new BackgroundScene();
		this._bgScene = bgScene;
		this.addChild(this._bgScene);


		var title = App.getBitmap('title_png', this._stageW / 2, this._stageH / 3);
		this._title = title;
		this._title.visible = true;
		this.addChild(this._title);

		var scoreBmt: egret.BitmapText = new egret.BitmapText();
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

	}

	private init(): void {
		this._title.visible = false;
		this._playBt.visible = false;

		this._gameReadyTxt.visible = true;
		this._tutorial.visible = true;
		this._scoreNum.visible = true;

		this._bird.init();
		this._bgScene.init();
		this._scoreNum.text = '0';
		this._currentScore = 0;
	}

	private gameReady(): void {
		if (!this.hasEventListener(egret.Event.ENTER_FRAME))
			this.addEventListener(egret.Event.ENTER_FRAME, this.tick, this);
		this._gameStatue = GameStatus.READY;

		this.init();

		egret.callLater(() => {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
		}, this);

	}

	private gameStart(): void {
		this._gameStatue = GameStatus.START;

		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
		this._gameReadyTxt.visible = false;
		this._tutorial.visible = false;
		this.tap();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);

	}

	private gameOverLayer(): void {
		var gameOverLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		gameOverLayer.touchEnabled = true;
		gameOverLayer.visible = false;
		gameOverLayer.width = this._stageW;
		this._gameOverLayer = gameOverLayer;
		this._gameOverLayer.y = this._stageH / 4;
		this.addChild(this._gameOverLayer);

		var gameOverTxt: egret.Bitmap = new egret.Bitmap(RES.getRes('text_game_over_png'));
		gameOverTxt.x = (this._gameOverLayer.width - gameOverTxt.width) / 2;
		this._gameOverLayer.addChild(gameOverTxt);

		var scorePanel: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		var panleBg: egret.Bitmap = new egret.Bitmap(RES.getRes('score_panel_png'));
		scorePanel.addChild(panleBg);
		scorePanel.x = (this._gameOverLayer.width - scorePanel.width) / 2;
		scorePanel.y = gameOverTxt.height;
		this._gameOverLayer.addChild(scorePanel);

		var restartBt: egret.Bitmap = new egret.Bitmap(RES.getRes('button_restart_png'));
		restartBt.x = (this._gameOverLayer.width - restartBt.width) / 2;
		restartBt.y = gameOverTxt.height + scorePanel.height;
		this._restartBt = restartBt;
		this._restartBt.touchEnabled = true;
		this._gameOverLayer.addChild(this._restartBt);

		this._restartBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
	}

	private showGameOver(): void {
		this._gameOverLayer.visible = true;
	}

	private restartGame(e: egret.Event): void {
		this._gameOverLayer.visible = false;
		this.gameReady();
	}
	private gameOver(): void {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.tick, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
		this.showGameOver();
	}

	private tap(): void {
		this._bird.flying();
	}

	private tick(): void {
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
	}

	public getBirdPos(): Array<number> {
		return this._bird.getPos();
	}

	public getBridOffset(): number {
		return this._bird.getOffset();
	}

	public addScore(): void {
		this._currentScore++;
		this._scoreNum.text = this._currentScore.toString();
	}
}