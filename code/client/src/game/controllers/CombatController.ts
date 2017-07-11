/**
 * 战斗界面控制器
 */
class CombatController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.COMBATUI, loadingUI);

	}
	private m_pCombatUI: CombatControlView;
	/**
         * 预加载资源组
         */
	protected getLoadGroup(data?: core.ModuleEventData): string[] {
		return ['combatUI'];
	}
	/**
	 * 显示
	 */
	protected show(data?: core.ModuleEventData): void {
		if (!this.m_pCombatUI) {
			let combatUI: CombatControlView = new CombatControlView();
			this.m_pCombatUI = combatUI;
		}
		KeyBoardManager.getInstance.addKeyBoardMsg();
		core.LayerCenter.getInstance().getLayer(LayerEnum.UI).addChild(this.m_pCombatUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		this.m_pCombatUI.hide();
	}
	
	protected release(): void {
		super.release();
	}
}