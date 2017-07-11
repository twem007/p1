/**
 * 走马灯控制器
 */
class NoticeAnimController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.NOTICEANIM, loadingUI);
	}
	private m_pNoticeAnimUI: NoticeAnimView;
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
		if (!this.m_pNoticeAnimUI) {
			let noticeAnimUI: NoticeAnimView = new NoticeAnimView();
			this.m_pNoticeAnimUI = noticeAnimUI;
		}
		// this._map.init(this._mapId);
		// this._map.create();
		core.LayerCenter.getInstance().getLayer(LayerEnum.TOP).addChild(this.m_pNoticeAnimUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		this.m_pNoticeAnimUI.hide();
	}
	protected release(): void {
		super.release();
	}
}