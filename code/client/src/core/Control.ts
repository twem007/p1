module core {
	/**
	 *    此为模块入口 除release()外都为底层自动调用
	 * @author yuxuefeng
	 * 
	 */
    export abstract class Control {

        private m_loadingUI: core.ILoadingUI;
        private m_data: EventData;
        protected p_moduleName: number;

        public constructor(moduleName: number, loadingUI: core.ILoadingUI) {
            this.p_moduleName = moduleName;
            this.m_loadingUI = loadingUI;
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
            let groups: string[] = this.getLoadGroup(this.m_data);
            if (groups && groups.length > 0) {
                if (this.m_loadingUI) {
                    this.m_loadingUI.show();
                }
                core.ResUtils.loadGroups(groups, this.onLoadProgress, this.onLoadFaild, this.onLoadComplete, this);
            } else {
                this.show(this.m_data);
            }
        }
        /**
         *  加载前
         */
        private onModuleShow(data: ModuleEventData): void {
            if (this.p_moduleName === data.moduleEnum) {
                this.m_data = data.messageData;
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
            if (this.m_loadingUI) {
                this.m_loadingUI.setProgress(data);
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
            if (this.m_loadingUI) {
                this.m_loadingUI.hide();
            }
            this.show(this.m_data);
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
