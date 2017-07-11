/**
 * 断线重连控制器
 */
class BreakLineController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.BREAKLINE, loadingUI);

	}
	private m_pBreakLineUI: BreakLineView;
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
		if (!this.m_pBreakLineUI) {
			let breakLineUI: BreakLineView = new BreakLineView();
			this.m_pBreakLineUI = breakLineUI;
		}
		core.LayerCenter.getInstance().getLayer(LayerEnum.HINTSEC).addChild(this.m_pBreakLineUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		this.m_pBreakLineUI.hide();
	}
	protected release(): void {
		super.release();
	}
}