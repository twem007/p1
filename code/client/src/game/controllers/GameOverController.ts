/**
 * 游戏结束界面控制器
 */
class GameOverController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.GAMEOVER, loadingUI);
	}
	private m_pGameOverUI: GameOverHintView;
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
		if (!this.m_pGameOverUI) {
			let gameOverUI: GameOverHintView = new GameOverHintView();
			this.m_pGameOverUI = gameOverUI;
		}
		core.LayerCenter.getInstance().getLayer(LayerEnum.POPUP).addChild(this.m_pGameOverUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		this.m_pGameOverUI.hide();
	}
	protected release(): void {
		super.release();
	}
}