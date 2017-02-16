class Bird extends egret.DisplayObjectContainer {

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	// private _bird: egret.MovieClip;
	private _mc: egret.MovieClip;
	public hasTween: boolean;
	 
	private onAddToStage(event:egret.Event): void{
		this.creatBird();
	}

	private creatBird(): void{
		var birdColor:string[] = ['green','blue','red'];
		let mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes("bird_json"), RES.getRes("bird_png"));
		//创建 MovieClip，将工厂生成的 MovieClipData 传入参数
        let birdMc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("Bird"));
		this._mc = birdMc;
		this.addChild(this._mc);
        //播放攻击动画
		this._mc.gotoAndPlay(birdColor[Math.floor(Math.random()*3)], -1);
		this.anchorOffsetX = this.width >> 1;
		this.anchorOffsetY = this.height >> 1;
        this.x = App.stageWidth / 2;
        this.y = App.stageHeight / 2;
	}

	public waveUp(): void{
		this.y--;
	}

	public update(): boolean{
		App.birdVelocity = App.birdVelocity + App.birdAcceleration;
		for (var i = 0; i < Math.abs(App.birdVelocity); i++) {
			this.y += Math.abs(App.birdVelocity) / App.birdVelocity;
			if(this.hitFloor()) return false;
		}
		return true;
	}

	public flying(): void{
		if(this.y >= 0){
			App.birdVelocity = App.birdTouchV;
		}
		egret.Tween.get(this).to({totation:this.rotation-30},200);
	}

	private hitFloor(): boolean{
		if( this.y + this.height >= App.landH ){
			return true;
		}
		return false;
	}

}

