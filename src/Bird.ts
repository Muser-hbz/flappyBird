class Bird extends egret.DisplayObjectContainer {

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private _mc: egret.MovieClip;
	 
	private onAddToStage(event:egret.Event): void{
		this.creatBird();
	}

	private creatBird(): void{
		var birdColor:string[] = ['green','blue','red'];
		let mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes("bird_json"), RES.getRes("bird_png"));
		//创建 MovieClip，将工厂生成的 MovieClipData 传入参数
        let birdMc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("Bird"));
		this._mc = birdMc;
		this._mc.anchorOffsetX = this._mc.x >> 1;
		this._mc.anchorOffsetY = this._mc.y >> 1;
		this.addChild(this._mc);
        //播放动画
		this._mc.gotoAndPlay(birdColor[Math.floor(Math.random()*3)], -1);
		this.anchorOffsetX = this.width >> 1;
		this.anchorOffsetY = this.height >> 1;
        this.x = App.stageWidth / 2;
        this.y = App.stageHeight / 2 - 40;
	}

	public init(): void{
		this.x = App.stageWidth / 4;
		this.y = App.stageHeight / 2 - 20;
	}

	private _angle:number = 0;

	public waveUp(): void{
		this.y = this.y + Math.sin(this._angle) * 2;
		this._angle = (this._angle + 0.15) % (2*Math.PI);		
	}

	public update(): boolean{
		App.birdVelocity += App.birdAcceleration;
		App.birdRv += App.birdRa;
		for (var i = 0; i < Math.abs(App.birdVelocity); i++) {
			this.y += Math.abs(App.birdVelocity) / App.birdVelocity;
			// if(this.rotation < 80 )	this.rotation += Math.abs(App.birdRv) / App.birdRv;

			if(this.hitFloor()){
				this.rotation = 90;
				return false;
			}
		}
		return true;
	}

	public flying(): void{
		if(this.y >= 0){
			App.birdVelocity = App.birdTouchV;
		}
		/*if(this.rotation < 90){
			this.rotation = App.birdTouchR;
		}*/
	}

	private hitFloor(): boolean{
		if( this.y + this.height >= App.landH ){
			return true;
		}
		return false;
	}
	
	public getPos():Array<number>{
		return [this.x,this.y];
	}

	public getOffset():number{
		return this.width / 2;
	}

}

