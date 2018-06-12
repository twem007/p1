module core {
	/**
     * EUI层，所有存放EUI的层都应该继承本类
     * 本类默认关闭自身点击，开启子对象的点击
     */
    export class EUILayer extends eui.UILayer {
        constructor() {
            super();
            this.touchEnabled = false;
            this.touchChildren = true;
        }
    }
}