class GameScene extends egret.DisplayObjectContainer{

	private static _instance:GameScene;

	private _gameStatue: number = GameStatus.INIT;

    private _mainMenu: egret.Bitmap;
	private _title: egret.Bitmap;
    private _gameOverTxt: egret.Bitmap;
	
    private _pauseBt: egret.Bitmap;
    private _restartBt: egret.Bitmap;
    private _playBt: egret.Bitmap;
    private _speedBt: egret.Bitmap;
    private _scoreTxt: egret.TextField;
    private _scoreNum: egret.TextField;
    private _currentScore: number = 0;

	private _stageW:number = App.stageWidth;
	private _stageH:number = App.stageHeight;


    private _bgScene: BackgroundScene;
    private _bird: Bird;

	private _gameReadyTxt: egret.Bitmap;
	private _tutorial: egret.Bitmap;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	public static getInstance():GameScene{
		if(!this._instance){
			this._instance = new GameScene();
		}
		return this._instance;
	}

	private onAddToStage(event:egret.Event):void{
		this.touchEnabled = true;
		this.creatGameScene();
		this.addEventListener(egret.Event.ENTER_FRAME,this.tick,this);
	}

	private creatGameScene(){
		var bgScene = new BackgroundScene();
		this._bgScene = bgScene;
		this.addChild(this._bgScene);


		var title = App.getBitmap('title_png', this._stageW / 2, this._stageH / 3);
		this._title = title;
		this._title.visible = true;
		this.addChild(this._title);

		var playBt = App.getBitmap('button_play_png',this._stageW / 2,this._stageH / 2 + 60);
		this._playBt = playBt;
		this._playBt.visible = true;
		this._playBt.touchEnabled = true;
		this._playBt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameReady,this);
		this.addChild(this._playBt);

		var bird = new Bird();
		this._bird = bird;
		this.addChild(this._bird);

		var gameReadyTxt = App.getBitmap('text_ready_png',this._stageW >> 1 ,this._stageH / 3);
		this._gameReadyTxt = gameReadyTxt;
		this._gameReadyTxt.visible = false;
		this.addChild(this._gameReadyTxt);

		var tutorial = App.getBitmap('tutorial_png',this._stageW >> 1,this._stageH >> 1);
		this._tutorial = tutorial;
		this._tutorial.visible = false;
		this.addChild(this._tutorial);

		var scoreTxt = new egret.TextField();
		scoreTxt.textColor = 0xffffff;
		scoreTxt.textAlign = 'center';
		scoreTxt.text = 'Score:';
		scoreTxt.x = (this._stageW - scoreTxt.width) / 2;
		scoreTxt.y = this._stageH * 0.05;
		scoreTxt.visible = false;
		this._scoreTxt = scoreTxt;
		this.addChild(this._scoreTxt);

		var scoreNum = new egret.TextField();
		scoreNum.textColor = 0xffffff;
		scoreNum.textAlign = 'center';
		scoreNum.text = '0';
		this._scoreNum = scoreNum;
		this._scoreNum.x = (this._stageW - this._scoreNum.width) / 2;
		this._scoreNum.y = this._stageH * 0.15;
		scoreNum.visible = false;
		this.addChild(this._scoreNum);


	}

	private init():void{
		this._title.visible = false;
		this._playBt.visible = false; 

		this._gameReadyTxt.visible = true;
		this._tutorial.visible = true;
		this._scoreTxt.visible = true;
		this._scoreNum.visible = true;

		this._bird.init();
		this._currentScore = 0;
	}

	private gameReady(e:egret.TouchEvent): void{
		if(!this.hasEventListener(egret.Event.ENTER_FRAME))
			this.addEventListener(egret.Event.ENTER_FRAME,this.tick,this);
		this._gameStatue = GameStatus.READY;
		this._playBt.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.gameReady,this);

		this.init();

		egret.callLater(()=>{
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);
		},this);
		
	}

	private gameStart(): void{
		this._gameStatue = GameStatus.START;

		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);
		this._gameReadyTxt.visible = false;
		this._tutorial.visible = false;
		this.tap();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);

	}

	private gameOverLayer(): void{
		var gameOverTxt:egret.Bitmap = App.getBitmap('text_game_over_png',this._stageW >> 1,this._stageH / 3);
		this._gameOverTxt = gameOverTxt;
		this.addChild(this._gameOverTxt);
	}

	private gameOver():void{
		this.removeEventListener(egret.Event.ENTER_FRAME,this.tick,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
	}
	
	private tap(): void{
		this._bird.flying();
	}

	private tick(): void{
		switch(this._gameStatue){
			case GameStatus.INIT:
				this._bird.waveUp();
				break;		
			case GameStatus.READY:
				this._bird.waveUp();
				break;
			case GameStatus.START:
				this._bgScene.movePipe();
				if(!this._bird.update() || this._bgScene.isHitBird()){
					this._gameStatue = GameStatus.END;
				}
				break;
			case GameStatus.END:
				// console.log(this._bird.height/2);
				this.gameOver();
				break;
		}
		this._bgScene.moveLand();
	}

	public getBirdPos():Array<number>{
		return this._bird.getPos();
	}

	public getBridOffset():number{
		return this._bird.getOffset();
	}

	public addScore():void{
		this._currentScore++;
		this._scoreNum.text = this._currentScore.toString();
	}
}