module core {
    /**
     * EUIComponent为EUI容器组件，该容器自动关注添加到舞台和从舞台移除事件
     * 
     */
    export abstract class EUIComponent extends eui.Component implements IComponent {

        constructor() {
            super();
        }

        public removeFromParent(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        /**
         * 释放资源
         */
        public abstract release(): void;
    }
}