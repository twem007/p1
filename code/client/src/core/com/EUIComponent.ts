module core {
    export abstract class EUIComponent extends eui.Component {
        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
        }
        
        /**
         * 显示
         */
        protected onShow(): void {
            this.addListener();
            this.onAdaptive();
        }
        
        /**
         * 添加监听
         */
        protected addListener(): void {
            core.EventCenter.getInstance().addEventListener(egret.Event.RESIZE, this.onAdaptive, this);
        }
        
        /**
         * 删除监听
         */
        protected removeListener(): void {
            core.EventCenter.getInstance().removeEventListener(egret.Event.RESIZE, this.onAdaptive, this);
        }
        
        /**
         * 自适应显示
         */
        public onAdaptive(): void {

        }
        
        /**
         * 释放资源
         */
        public abstract release(): void;

        /**
         * 隐藏显示
         */
        public hide(): void {
            this.removeListener();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}