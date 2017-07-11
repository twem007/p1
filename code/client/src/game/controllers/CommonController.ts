class CommonController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.COMMON, loadingUI);
	}
	private m_pCommonUI: CommonHintView;
	/**
         * 预加载资源组
         */
	protected getLoadGroup(data?: core.ModuleEventData): string[] {
		return [];
	}
	/**
	 * 显示
	 */
	protected show(data?: core.ModuleEventData): void {
		this.m_pCommonUI.m_pCommonData = data.messageData;
		if (!this.m_pCommonUI) {
			let commonUI: CommonHintView = new CommonHintView();
			this.m_pCommonUI = commonUI;
		}
		core.LayerCenter.getInstance().getLayer(LayerEnum.HINT).addChild(this.m_pCommonUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		this.m_pCommonUI.hide();
	}
	protected release(): void {
		super.release();
	}
}