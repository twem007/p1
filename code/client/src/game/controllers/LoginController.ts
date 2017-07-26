/**
 * 登录界面控制器
 */
class LoginController extends core.Control {
	public constructor() {
		super(ModuleEnum.LOGIN);
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
		if (this.m_pLoginUI && this.m_pLoginUI.parent) {
			this.m_pLoginUI.parent.removeChild(this.m_pLoginUI);
		}
		this.m_pLoginUI = null;
	}
	
	protected release(): void {
		super.release();
	}
}