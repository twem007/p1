class LoginUI extends core.EUIComponent {
	/**主组 */
	private m_pMainGroup: eui.Group;
	/**背景图 */
	private m_pBgImg: eui.Image;
	/**logo组 */
	private m_pLogoGroup: eui.Group;
	/**logo图片 */
	private m_pLogo: eui.Image;
	/**账号密码组 */
	private m_pAccountGroup: eui.Group;
	/**账号 */
	private m_pAccount: eui.EditableText;
	/**密码 */
	private m_pPassword: eui.EditableText;
	/**登录按钮 */
	private m_pLoginBtn: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/login/LoginsSkin.exml";
	}
	protected onShow(): void {
		super.onShow();
		this.m_pLogo.visible = false;
		this.m_pAccount.text = 'test';
		this.onAdaptive();
	}

	protected addListener() {
		super.addListener();
		core.EventCenter.getInstance().addEventListener(egret.Event.RESIZE, this.onAdaptive, this);
		this.m_pLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this.m_pPassword.addEventListener(egret.Event.CHANGE, this.onChangePassword, this);
	}

	protected removeListener(): void {
		super.removeListener();
		core.EventCenter.getInstance().removeEventListener(egret.Event.RESIZE, this.onAdaptive, this);
		this.m_pLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this.m_pPassword.removeEventListener(egret.Event.CHANGE, this.onChangePassword, this);
	}

	/**更新舞台 */
	public onAdaptive() {
		UIManager.updataPoint(this.m_pLogoGroup, 668, 308);
		UIManager.updataPoint(this.m_pAccountGroup, 668, 334);
		UIManager.updataPoint(this.m_pLoginBtn, 667, 614);
	}

	private onButtonClick(event: egret.TouchEvent): void {
		core.SoundUtils.getInstance().playSound(2);
		if (this.m_pLogoGroup.visible) {
			this.m_pLogoGroup.visible = false;
			this.m_pAccountGroup.visible = true
			this.m_pLoginBtn.source = "logoBoomUI_json.loading_btn_1";
		}
		else {
			if (this.m_pAccount.text != null && this.m_pAccount.text != "") {
				this.release();
				core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.LOGIN));
				core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.MAINUI));
			}
			else {
				core.TextUtils.showTextTip("请输入账号");
			}
		}
	}
	/*控制密码输入长度**/
	private onChangePassword() {
		let password: string = this.m_pPassword.text;
		if (password.length >= 20) {
			password = password.substring(0, 20);
			this.m_pPassword.text = password;
		}
	}
}