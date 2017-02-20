class BackgroundScene extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.creatScene();
	}

	private _land1: egret.Bitmap;
	private _land2: egret.Bitmap;
	private _pipeUp1: egret.Bitmap;
	private _pipeUp2: egret.Bitmap;
	private _pipeDown1: egret.Bitmap;
	private _pipeDown2: egret.Bitmap;


	private _scoreBitmapArray:Array<egret.Bitmap> = new Array<egret.Bitmap>();
	private _numberBitmapArray:Array<egret.Bitmap> = this.loadNumberImg();


	private creatScene(): void{
		var bg:egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes('bg_day_png');
		bg.x = 0;
		bg.y = 0;
		this.addChild(bg);

		var land1:egret.Bitmap = new egret.Bitmap(RES.getRes('land_png'));
		var land2:egret.Bitmap = new egret.Bitmap(RES.getRes('land_png'));
		land1.x = 0;
		land1.y = bg.height - land1.height;
		land2.x = land2.width;
		land2.y = land1.y;
		App.landH = land1.y;
		this._land1 = land1;
		this._land2 = land2;

		var pipeUp1:egret.Bitmap = new egret.Bitmap(RES.getRes('pipe_up_png'));
		var pipeUp2:egret.Bitmap = new egret.Bitmap(RES.getRes('pipe_up_png'));
		pipeUp1.x = App.stageWidth;
		pipeUp2.x = App.stageWidth * 1.5;
		pipeUp1.anchorOffsetY = pipeUp1.height;
		pipeUp2.anchorOffsetY = pipeUp2.height;
		pipeUp1.y = this.getPipeUpH();
		pipeUp2.y = this.getPipeUpH();
		this._pipeUp1 = pipeUp1;
		this._pipeUp2 = pipeUp2;
		this.addChild(this._pipeUp1);
		this.addChild(this._pipeUp2);

		var pipeDown1:egret.Bitmap = new egret.Bitmap(RES.getRes('pipe_down_png'));
		var pipeDown2:egret.Bitmap = new egret.Bitmap(RES.getRes('pipe_down_png'));
		pipeDown1.x = this._pipeUp1.x;
		pipeDown2.x = this._pipeUp2.x;
		pipeDown1.y = this._pipeUp1.y + 100;
		pipeDown2.y = this._pipeUp2.y + 100;
		this._pipeDown1 = pipeDown1;
		this._pipeDown2 = pipeDown2;
		this.addChild(this._pipeDown1);
		this.addChild(this._pipeDown2);

		this.addChild(this._land1);
		this.addChild(this._land2);
	}

	public moveLand(): void{
		var offset:number = App.landOffset;
		this._land1.x -= offset;
		this._land2.x -= offset;
		if(this._land2.x == 0)
			this._land1.x = App.stageWidth;
		if((this._land1.x == 0))
			this._land2.x = App.stageWidth;		
	}

	public movePipe(): void{
		var offset:number = App.pipeOffset;
		this._pipeUp1.x -= offset;
		this._pipeUp2.x -= offset;
		this._pipeDown1.x = this._pipeUp1.x;
		this._pipeDown2.x = this._pipeUp2.x;
		if( this._pipeUp1.x == -this._pipeUp1.width ){
			this._pipeUp1.x =  App.stageWidth;
			this._isCheck = false;
			this._pipeUp1.y = this.getPipeUpH();
			this._pipeDown1.x = this._pipeUp1.x;
			this._pipeDown1.y = this._pipeUp1.y + 100;
		}
		if( this._pipeUp2.x == -this._pipeUp2.width ){
			this._pipeUp2.x =  App.stageWidth;
			this._isCheck = false;
			this._pipeUp2.y = this.getPipeUpH();
			this._pipeDown2.x = this._pipeUp2.x;
			this._pipeDown2.y = this._pipeUp2.y + 100;
		}
		this.checkScore();
	}

	private getPipeUpH(): number{
		return Math.floor(100 + Math.random() * 80);
	}
	
	public isHitBird(): boolean{
		var birdOffset = GameScene.getInstance().getBridOffset();
		var birdX:number = GameScene.getInstance().getBirdPos()[0];
		var birdY:number = GameScene.getInstance().getBirdPos()[1];
		if(this.isInUpPipe(this._pipeUp1,birdOffset,birdX,birdY)) return true;
		if(this.isInUpPipe(this._pipeUp2,birdOffset,birdX,birdY)) return true;
		if(this.isInDownPike(this._pipeDown1,birdOffset,birdX,birdY)) return true;
		if(this.isInDownPike(this._pipeDown1,birdOffset,birdX,birdY)) return true;

		return false;
	}

	private isInUpPipe(pikeUp:egret.Bitmap,birdOffset:number,birdX:number,birdY:number): boolean{
		if(pikeUp.x <= birdX + birdOffset && pikeUp.x >= birdX - pikeUp.width ){
			if( birdY <= pikeUp.y ){
				return true;
			}
		}
		return false;
	}

	private isInDownPike(pikeDown:egret.Bitmap,birdOffset:number,birdX:number,birdY:number): boolean{
		if(pikeDown.x <= birdX + birdOffset && pikeDown.x >= birdX - pikeDown.width){
			if( birdY + 24 >= pikeDown.y ){
				return true;
			}
		}
		return false;
	}

	private _isCheck:boolean = false;

	private _line:number;
	private checkScore():void{
        this._line = GameScene.getInstance().getBirdPos()[0] - GameScene.getInstance().getBridOffset();
		if(this._isCheck) return;
		var _line:number = GameScene.getInstance().getBirdPos()[0] - GameScene.getInstance().getBridOffset();

		if( this._pipeUp1.x + this._pipeUp1.width <= _line || this._pipeUp2.x + this._pipeUp2.width <= _line ){
			this.addScore();
			this._isCheck = true;
		}
	}

	private addScore():void{
		GameScene.getInstance().addScore();
	}	

	private formatScore(score:number):void{
	}

	private loadNumberImg():Array<egret.Bitmap>{
		var numberImg:Array<egret.Bitmap> = new Array<egret.Bitmap>();
		for(let i=0;i<=9;++i){
			numberImg[i] = new egret.Bitmap(RES.getRes(`font_${i}`));
		}	
		return numberImg;
	}
}