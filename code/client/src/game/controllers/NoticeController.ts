class NoticeController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.NOTICE, loadingUI);
	}
	private m_pNoticeUI: NoticeView;
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
		if (!this.m_pNoticeUI) {
			let noticeUI: NoticeView = new NoticeView();
			this.m_pNoticeUI = noticeUI;
		}
		// this._map.init(this._mapId);
		// this._map.create();
		core.LayerCenter.getInstance().getLayer(LayerEnum.HINTSEC).addChild(this.m_pNoticeUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		this.m_pNoticeUI.hide();
	}
	protected release(): void {
		super.release();
	}
}