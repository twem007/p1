class MainController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.MAINUI, loadingUI);
	}
	private m_pMainUI: MainUI;
	/**
         * 预加载资源组
         */
	protected getLoadGroup(data?: core.ModuleEventData): string[] {
		return ['mainUI'];
	}
	/**
	 * 显示
	 */
	protected show(data?: core.ModuleEventData): void {
		if (!this.m_pMainUI) {
			let mainUI: MainUI = new MainUI();
			this.m_pMainUI = mainUI;
		}
		// this._map.init(this._mapId);
		// this._map.create();
		core.LayerCenter.getInstance().getLayer(LayerEnum.POPUP).addChild(this.m_pMainUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		if (this.m_pMainUI.parent) {
			this.m_pMainUI.parent.removeChild(this.m_pMainUI);
		}
	}
	protected release(): void {
		super.release();
	}
}