module core {
	/**
	 *    此为模块入口 除release()外都为底层自动调用
	 * @author yuxuefeng
	 * 
	 */
    export abstract class Control {

        private loadingUI: core.ILoadingUI;
        private data: any;
        protected moduleName: number;

        public constructor(moduleName: number, loadingUI: core.ILoadingUI) {
            this.moduleName = moduleName;
            this.loadingUI = loadingUI;
            this.init();
        }
        /**
         * 初始化
         */
        private init(): void {
            core.EventCenter.getInstance().addEventListener(core.EventID.MODULE_SHOW, this.onModuleShow, this);
            core.EventCenter.getInstance().addEventListener(core.EventID.MODULE_HIDE, this.onModuleHide, this);
        }
        /**
         * 预加载
         */
        private preload(): void {
            let groups: string[] = this.getLoadGroup(this.data);
            if (groups.length > 0) {
                if (this.loadingUI) {
                    this.loadingUI.show();
                }
                core.ResUtils.loadGroups(groups, this.onLoadProgress, this.onLoadFaild, this.onLoadComplete, this);
            } else {
                this.show(this.data);
            }
        }
        /**
         *  加载前
         */
        private onModuleShow(data: ModuleEventData): void {
            if (this.moduleName === data.moduleEnum) {
                this.data = data.messageData;
                this.preload();
            }
        }
        /**
         * 关闭前
         */
        private onModuleHide(): void {
            let curModule: string | number = arguments[0];
            if (this.moduleName === curModule) {
                this.hide();
            }
        }
        /**
         * 加载进度
         */
        private onLoadProgress(data: core.GroupData): void {
            if (this.loadingUI) {
                this.loadingUI.setProgress(data);
            }
        }
        /**
         * 加载失败
         */
        private onLoadFaild(data: core.GroupData): void {
            Log(`资源组${data.curGroup}加载失败, 失败URL：${data.curResItem.url}`);
        }
        /**
         * 加载完成
         */
        private onLoadComplete(data: core.GroupData): void {
            if (this.loadingUI) {
                this.loadingUI.hide();
            }
            this.show(this.data);
        }
        /**
         * 预加载资源组
         */
        protected abstract getLoadGroup(data?: any): string[];
        /**
         * 显示
         */
        protected abstract show(data?: any): void
        /**
         * 隐藏
         */
        protected abstract hide(): void
        /**
         * 释放资源
         */
        protected release(): void {
            core.EventCenter.getInstance().removeEventListener(core.EventID.MODULE_SHOW, this.onModuleShow, this);
            core.EventCenter.getInstance().removeEventListener(core.EventID.MODULE_HIDE, this.onModuleHide, this);
        }
    }
}
