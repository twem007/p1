module core {
    /**
     * EUIComponent为EUI容器组件，该容器自动关注添加到舞台和从舞台移除事件
     * 
     */
    export class EUIComponent extends eui.Component implements IComponent {
        
        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
        }

        /**
         * 显示
         */
        protected onShow(event?: egret.Event): void {
            this.addListener();
        }

        protected onHide(event?: egret.Event): void {
            this.removeListener();
        }
        /**
         * 添加监听
         */
        protected addListener(): void {
        }

        /**
         * 删除监听
         */
        protected removeListener(): void {
        }

        /**
         * 释放资源
         */
        public release(): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
            this.onHide();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}