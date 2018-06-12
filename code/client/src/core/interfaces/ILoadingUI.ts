module core {
	/**
     * Loading接口
     */
    export interface ILoadingUI {
        /**
         * 设置进度
         */
        setProgress(progress: core.Progress): void;
        /**
         * 显示Loading
         */
        show(): void;
        /**
         * 隐藏Loading
         */
        hide(): void;
    }
    /**
     * 进度结构
     */
    export class Progress {
        /**
         * 当前已加载
         */
        loaded: number;
        /**
         * 总共加载
         */
        total: number;
    }
}
