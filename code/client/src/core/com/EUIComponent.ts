module core {
    export class EUIComponent extends eui.Component {
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
            this.onAdaptive();
        }

        protected onHide(event?: egret.Event): void {
            this.removeListener();
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