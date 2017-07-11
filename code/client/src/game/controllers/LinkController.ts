class LinkController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.LINK, loadingUI);
	}
	private m_pLinkUI: LinkHintView;
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
		if (!this.m_pLinkUI) {
			let linkUI: LinkHintView = new LinkHintView();
			this.m_pLinkUI = linkUI;
		}
		core.LayerCenter.getInstance().getLayer(LayerEnum.HINTSEC).addChild(this.m_pLinkUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		this.m_pLinkUI.hide();
	}
	protected release(): void {
		super.release();
	}
}