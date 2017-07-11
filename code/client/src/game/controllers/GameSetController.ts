/**
 * 游戏设置界面控制器
 */
class GameSetController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.GAMESETUI, loadingUI);
	}
	private m_pGameSetUI: GameSetView;
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
		if (!this.m_pGameSetUI) {
			let gameSetUI: GameSetView = new GameSetView();
			this.m_pGameSetUI = gameSetUI;
		}
		core.LayerCenter.getInstance().getLayer(LayerEnum.POPUP).addChild(this.m_pGameSetUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		this.m_pGameSetUI.hide();
	}
	protected release(): void {
		super.release();
	}
}