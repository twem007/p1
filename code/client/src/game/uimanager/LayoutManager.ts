class LayoutManager {

	public static DEFAULT_WIDTH: number = 1334;

	public static DEFAULT_HEIGHT: number = 750;

	/**弹窗内容适配 --- 控制最大大小，并赋予高适配*/
	public static contentAdaptive(obj: egret.DisplayObject, initY: number, isMax: boolean = false): void {
		if (!obj) return;
		let scaleH = core.LayerCenter.stageHeight / LayoutManager.DEFAULT_HEIGHT;
		obj.scaleX = obj.scaleY = Math.min(scaleH, 1);
		if (isMax) obj.scaleX = obj.scaleY = scaleH;
		obj.y = initY * scaleH;
	}

	/**裁剪背景适配 */
	public static bgAdaptive(obj: egret.DisplayObject, initY?: number): void {
		if (!obj) return;
		initY = initY || 0;
		let scaleH = core.LayerCenter.stageHeight / LayoutManager.DEFAULT_HEIGHT;
		obj.scaleX = obj.scaleY = Math.max(scaleH, 1);
		obj.y = initY * Math.max(scaleH, 1);
	}

	/**横条内容适配 */
	public static barAdaptive(obj: egret.DisplayObject, initY: number): void {
		if (!obj) return;
		let scaleW = obj.width / LayoutManager.DEFAULT_WIDTH;
		let scaleH = core.LayerCenter.stageHeight / LayoutManager.DEFAULT_HEIGHT;
		obj.scaleX = obj.scaleY = (obj.scaleX / scaleW);
		obj.y = initY * scaleH;
	}

	/**更新y */
	public static updateY(obj: egret.DisplayObject, initY: number) {
		if (!obj) return;
		let scaleH = core.LayerCenter.stageHeight / LayoutManager.DEFAULT_HEIGHT;
		obj.y = initY * scaleH;
	}

	/**下适配 */
	public static belowAdaptive(obj: egret.DisplayObject, initY: number, initX?: number): void {
		let stageHeight = core.LayerCenter.stageHeight;
		obj.y = stageHeight - (LayoutManager.DEFAULT_HEIGHT - initY);
		if (initX) {
			obj.x = initX;
		}
	}

	/**高适配 */
	public static heightAdaptive(obj: egret.DisplayObject, initHeight: number): void {
		let stageHeight = core.LayerCenter.stageHeight;
		if (stageHeight < LayoutManager.DEFAULT_HEIGHT) {
			let stagePercentage = stageHeight / LayoutManager.DEFAULT_HEIGHT;
			obj.height = initHeight * stagePercentage;
		} else {
			obj.height = initHeight;
		}
	}


	/**拉伸适配 */
	public static updateScale(obj: egret.DisplayObject): void {
		let widthPercentage = core.LayerCenter.stageWidth / LayoutManager.DEFAULT_WIDTH;
		let hightPercentage = core.LayerCenter.stageHeight / LayoutManager.DEFAULT_HEIGHT;
		obj.scaleX = widthPercentage;
		obj.scaleY = hightPercentage;
	}
}