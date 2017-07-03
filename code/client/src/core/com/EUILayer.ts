module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export class EUILayer extends eui.UILayer {
        constructor() {
            super();
            this.touchEnabled = true;
            this.touchChildren = true;
        }
    }
}