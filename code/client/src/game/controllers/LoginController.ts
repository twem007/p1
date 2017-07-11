/**
 * 登录界面控制器
 */
class LoginController extends core.Control {
	public constructor(loadingUI: core.ILoadingUI) {
		super(ModuleEnum.LOGIN, loadingUI);
	}
	private m_pLoginUI: LoginUI;
	/**
	 * 预加载资源组
	 */
	protected getLoadGroup(data?: core.ModuleEventData): string[] {
		return ['soundUI', 'animUI'];
	}
	/**
	 * 显示
	 */
	protected show(data?: core.ModuleEventData): void {
		if (!this.m_pLoginUI) {
			let loginUI: LoginUI = new LoginUI();
			this.m_pLoginUI = loginUI;
		}
		core.LayerCenter.getInstance().getLayer(LayerEnum.UI).addChild(this.m_pLoginUI);
	}
	/**
	 * 隐藏
	 */
	protected hide(): void {
		this.m_pLoginUI.hide();
	}
	protected release(): void {
		super.release();
	}
}