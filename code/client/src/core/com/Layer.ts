module core {
	/**
	 * 显示层，每个显示层都应该继承本类
	 * 本类默认关闭自身点击，开启子对象的点击
	 */
	export class Layer extends egret.DisplayObjectContainer {
		public constructor() {
			super();
			this.touchEnabled = false;
			this.touchChildren = true;
		}
	}
}
