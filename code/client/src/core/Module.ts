module core {
	/**
	 *  此为模块入口 除release()外都为底层自动调用
     *    
	 * @author yuxuefeng
	 * 
	 */
    export abstract class Module {
        /**
         * 进入模块传入数据
         */
        protected p_data: any;
        /**
         * 当前模块
         */
        protected p_moduleName: number;

        public constructor(moduleName: number) {
            this.p_moduleName = moduleName;
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
            let groups: string[] = this.getLoadGroup(this.p_data);
            if (groups && groups.length > 0) {
                let loading: core.ILoadingUI = LoadingManager.getCurLoading();
                if (loading) {
                    loading.show();
                }
                core.ResUtils.loadGroups(groups, this.onLoadProgress, this.onLoadFaild, this.onLoadComplete, this);
            } else {
                this.preShow(this.p_data);
                this.show(this.p_data);
            }
        }
        /**
         *  加载前
         */
        private onModuleShow(data: ModuleEventData): void {
            if (this.p_moduleName === data.moduleEnum) {
                this.p_data = data.messageData;
                this.preload();
            }
        }
        /**
         * 关闭前
         */
        private onModuleHide(data: ModuleEventData): void {
            if (this.p_moduleName === data.moduleEnum) {
                this.hide();
            }
        }
        /**
         * 加载进度
         */
        private onLoadProgress(data: core.GroupData): void {
            let loading: core.ILoadingUI = LoadingManager.getCurLoading();
            if (loading) {
                loading.setProgress(data);
            }
        }
        /**
         * 加载失败
         */
        private onLoadFaild(data: core.GroupData): void {
            if (data.curResItem) {
                egret.log(`失败URL：${data.curResItem.url}`);
            }
        }
        /**
         * 加载完成
         */
        private onLoadComplete(data: core.GroupData): void {
            core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_LOADED, this.p_moduleName));
            this.preShow(this.p_data);
            let loading: core.ILoadingUI = LoadingManager.getCurLoading();
            if (loading) {
                loading.hide();
            }
            this.show(this.p_data);
        }
        /**
         * 预加载资源组
         */
        protected abstract getLoadGroup(data?: any): string[];
        /**
         * 预显示
         */
        protected preShow(data?: any): void { }
        /**
         * 显示
         */
        protected abstract show(data?: any): void;
        /**
         * 隐藏
         */
        protected abstract hide(): void;
        /**
         * 释放资源
         */
        protected release(): void {
            core.EventCenter.getInstance().removeEventListener(core.EventID.MODULE_SHOW, this.onModuleShow, this);
            core.EventCenter.getInstance().removeEventListener(core.EventID.MODULE_HIDE, this.onModuleHide, this);
        }
    }
}
