class UIManager {
	public constructor() {

	}
	public static CONTENT_WIDTH:number=1334;
	public static CONTENT_HEIGHT:number=750
	/**
		* 舞台改变 更新位置
		* obj 要初始化的对象
		* pointX:初始的x值
		* pointY:初始的y值
		*/
	public static updataPoint(obj: any, pointX: number, pointY: number) {
		let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		let widthPercentage = stageWidth / this.CONTENT_WIDTH;
		let hightPercentage = stageHeight / this.CONTENT_HEIGHT;
		obj.x = widthPercentage * pointX;
		obj.y = hightPercentage * pointY;
	}
	/**根据舞台宽比改变X值
	 * obj:要更新的对象
	 * pointX：x坐标
	 */
	public static updataX(obj: any, pointX: number) {
		let stageWidth = core.LayerCenter.stageWidth;
		let widthPercentage = stageWidth / this.CONTENT_WIDTH;
		obj.x = widthPercentage * pointX;
	}
	/**
	 * 根据舞台高比改变Y值
	 * obj:要更新的对象
	 * pointY：y坐标
	 */
	public static updataY(obj: any, pointY: number) {
		let stageHeight = core.LayerCenter.stageHeight;
		let hightPercentage = stageHeight / this.CONTENT_HEIGHT;
		obj.y = hightPercentage * pointY;
	}

	/*
	 * 舞台改变 更新大小
	 * obj 要初始化的对象
	 */
	public static updataScale(obj: any, initScale: number = 1) {
		let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		let widthPercentage = stageWidth / this.CONTENT_WIDTH;
		let hightPercentage = stageHeight / this.CONTENT_HEIGHT;
		obj.scaleX = widthPercentage;
		obj.scaleY = hightPercentage;
	}


    /**
	 * 更新舞台时按比例修改对象位置和缩放
	 * obj:要更新的对象
	 * pointX:对象的基础x
	 * pointY:对象的基础y
	 * scaleX:对象的基础缩放x
	 * scaleY:对象的基础缩放y
	 */
	public static updataStageChangeObj(obj: any, pointX: number, pointY: number, scaleX: number, scaleY: number) {
		let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		let widthPercentage = stageWidth / this.CONTENT_WIDTH;
		let hightPercentage = stageHeight / this.CONTENT_HEIGHT;
		obj.x = widthPercentage * pointX;
		obj.y = hightPercentage * pointY;
		obj.scaleX = widthPercentage * scaleX;
		obj.scaleY = hightPercentage * scaleY;
	}
    /**根据宽来对对象进行等比缩放
	 * obj:要改变的对象
	 * scale:对象原宽缩放比
	 */
	public static changeSizeByWidth(obj: any, scale: number) {
		let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		let widthPercentage = stageWidth / this.CONTENT_WIDTH;

		obj.scaleX = widthPercentage * scale;
		obj.scaleY = widthPercentage * scale;
	}

    /**根据宽比修改比例 ，高度拉长 ，适配x坐标
	 * 
	 */
	public static changeByWidthAndHeight(obj: any, scale: number, initHeight: number, initX: number) {
		let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		let widthPercentage = stageWidth / this.CONTENT_WIDTH;
		let height = 1 + (1 - stageWidth / this.CONTENT_WIDTH);
		obj.scaleX = widthPercentage * scale;
		obj.scaleY = widthPercentage * scale;
		obj.x = initX * widthPercentage;
		if (height > 1) {
			obj.height = initHeight * height;
		} else {
			obj.height = initHeight;
		}
	}
    /**左下角适配
	 * obj:要改变的对象
	 * pointX:距离舞台的左边距离
	 * pointY:距离舞台的下边距离
	 */
	public static leftBelowAdaptive(obj: any, pointX: number, pointY: number) {
		let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		obj.x = pointX;
		obj.y = stageHeight - (this.CONTENT_HEIGHT - pointY);
	}
	 /**右下角适配
	 * obj:要改变的对象
	 * pointX:距离舞台的左边距离
	 * pointY:距离舞台的下边距离
	 */
	public static rightBelowAdaptive(obj: any, pointX: number, pointY: number) {
        let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		obj.y = stageHeight - (this.CONTENT_HEIGHT - pointY);
		obj.x = stageWidth-(this.CONTENT_WIDTH- pointX);
		
	}
    /**右上角适配
	 * obj:要改变的对象
	 * pointX:初始x值
	 * pointY:初始y值
	 */
	public static rightTopAdaptive(obj: any, pointX: number, pointY: number) {
		let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		obj.x = stageWidth - (this.CONTENT_WIDTH - pointX);
		obj.y = pointY;
	}


    /**
	 * 根据输入坐标获取舞台改变后的宽高比坐标
	 * pointX：x坐标
	 * pointY: y坐标
	 * return point  返回改变后的比例坐标
	 */
	public static getPoint(pointX: number, pointY: number): egret.Point {
		let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		let widthPercentage = stageWidth / this.CONTENT_WIDTH;
		let hightPercentage = stageHeight / this.CONTENT_HEIGHT;
		let point: egret.Point = new egret.Point();
		point.x = widthPercentage * pointX;
		point.y = hightPercentage * pointY;
		return point;
	}
	/**根据舞台边距获取对应的坐标（目前暂时用于技能按钮） */
	public static setBtnPoint(obj: any, pointX: number, pointY: number) {
		let stageWidth = core.LayerCenter.stageWidth;
		let stageHeight = core.LayerCenter.stageHeight;
		obj.x = stageWidth - (pointX * (stageWidth / this.CONTENT_WIDTH));
		obj.y = stageHeight - pointY;
	}
	/**高小于原来的比例调整对象缩放并修改Y值 */
	public static changeHeightSize(obj: any, initSize: number, initY: number) {
		let stageHeight = core.LayerCenter.stageHeight;
		let stagePercentage = stageHeight / this.CONTENT_HEIGHT
		if (stagePercentage < 1) {
			obj.scaleY = initSize * stagePercentage;
			obj.y = initY * stagePercentage;
		} else {
			obj.scaleY = initSize;
			obj.y = initY;
		}
	}
	/**宽小于原来的比例调整对象缩放 */
	public static changeWidthSize(obj: any, initSize: number) {
		let stageWidth = core.LayerCenter.stageWidth;
		let stagePercentage = stageWidth / this.CONTENT_WIDTH;
		if (stagePercentage < 1) {
			obj.scaleX = initSize * stagePercentage;
			obj.scaleY = initSize * stagePercentage;
		} else {
			obj.scaleX = 1- (initSize * stagePercentage-1);
			obj.scaleY = 1- (initSize * stagePercentage-1);
		}
	}
	/**根据屏幕高比如果小于原来尺寸对obj放大 */
	public static upHeightSize(obj: egret.DisplayObject, initSize: number) {
		let stageHeight = core.LayerCenter.stageHeight;
		if (stageHeight < this.CONTENT_HEIGHT) {
			let stagePercentage = this.CONTENT_HEIGHT / stageHeight;
			obj.scaleX = initSize * stagePercentage;
			obj.scaleY = initSize * stagePercentage;
		} else {
			obj.scaleX = initSize;
			obj.scaleY = initSize;
		}

	}
	/**根据屏幕高比如果小于原来尺寸对obj的宽高放大 */
	public static upHW(obj: egret.DisplayObject, initWidth: number, initHeight: number) {
		let stageHeight = core.LayerCenter.stageHeight;
		if (stageHeight < this.CONTENT_HEIGHT) {
			let stagePercentage = this.CONTENT_HEIGHT / stageHeight;
			obj.width = initWidth * stagePercentage;
			obj.height = initHeight * stagePercentage;
		} else {
			obj.width = initWidth;
			obj.height = initHeight;
		}
	}


	public static changePoint(obj: any, initX: number, initY: number) {
		let stageHeight = core.LayerCenter.stageHeight;
		let stageHeightPercentage = stageHeight / this.CONTENT_HEIGHT
		if (stageHeightPercentage > 1) {
			obj.scaleY = initY * stageHeightPercentage;
		} else {
			obj.scaleY = initY;
		}
		let stageWidth = core.LayerCenter.stageWidth;
		let stageWidthPercentage = stageWidth / this.CONTENT_WIDTH
		if (stageWidthPercentage > 1) {
			obj.scaleX = initX * stageWidthPercentage;

		} else {
			obj.scaleX = initX;

		}
	}
    /**二级界面的出现效果 */
	public static startEffect(group: eui.Group) {
		group.alpha = 0;
		group.scaleX = 0;
		group.scaleY = 0;
		egret.Tween.get(group).to({ alpha: 1, scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 100);
	}
} 