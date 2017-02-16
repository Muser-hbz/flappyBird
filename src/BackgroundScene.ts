class BackgroundScene extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.creatScene();
	}

	  

	private _landArr: Array<egret.Bitmap>;

	private creatScene(): void{
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
		this._landArr = [land1,land2];
	}

	public moveLand(): void{
		var offset = App.bgOffset;
		var land1 = this._landArr[0];
		var land2 = this._landArr[1];
		land1.x -= offset;
		land2.x -= offset;
		if(land2.x == 0)
			land1.x = App.stageWidth;
		if((land1.x == 0))
			land2.x = App.stageWidth;		
	}


}