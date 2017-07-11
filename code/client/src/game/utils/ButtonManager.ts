class ButtonManager {
	public constructor() {
	}
	/**
	 * 点击改变按钮大小特效
	 * button:作为按钮的对象
	 * scale:要改变的大小
	 * initScale:初始的大小
	 */
	public static btnChangeByScale(button: any, scale: number, initScale: number) {
		egret.Tween.get(button).to({ scaleX: scale, scaleY: scale }, 70).to({ scaleX: initScale, scaleY: initScale }, 70);
	}
	/**
	 * 按钮放大缩小
	 * button:作为按钮的对象
	 * scale:要改变的大小
	 */
	public static btnScale(button: any, scale: number) {
		button.scaleX = scale;
		button.scaleY = scale;
	}

}