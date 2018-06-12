module core {
    /**
     * 组件接口
     */
    export interface IComponent {
        /**
         * 释放资源
         */
        release(): void;
        /**
         * 从父容器移除
         */
        removeFromParent(): void;
    }
}