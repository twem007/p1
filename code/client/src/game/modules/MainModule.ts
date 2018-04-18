/**
 * 主界面控制器
 */
class MainModule extends core.Module {
	public constructor() {
		super(ModuleEnum.MAINUI);
	}
	private m_pMainUI: MainUI;
	/**
	* 获取loading
	*/
	protected getLoading(): core.ILoadingUI {
		return core.LoadingManager.getLoading(MainLoadingUI);
	}
	/**
	 * 预加载资源组
	 */
	protected getLoadGroup(data?: core.ModuleEventData): string[] {
		return ['mainUI'];
	}
	/**
	 * 显示
	 */
	protected show(data?: any): void {
		egret.log(`外部传递参数：${data}` );
		if (!this.m_pMainUI) {
			let mainUI: MainUI = new MainUI();
			this.m_pMainUI = mainUI;
		}
		core.LayerCenter.getInstance().getLayer(LayerEnum.UI).addChild(this.m_pMainUI);
		//单元测试
        runUnitTest();
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		if (this.m_pMainUI && this.m_pMainUI.parent) {
			this.m_pMainUI.parent.removeChild(this.m_pMainUI);
		}
	}
	protected release(): void {
		super.release();
	}
}