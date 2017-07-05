class LoginUI extends core.EUIComponent {

	public m_pMainGroup: eui.Group;
	public m_pBgImg: eui.Image;
	public m_pLogoGroup: eui.Group;
	public m_pLogo: eui.Image;
	public m_pAccountGroup: eui.Group;
	public m_pAccount: eui.EditableText;
	public m_pPassword: eui.EditableText;
	public m_pLoginBtn: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/login/LoginsSkin.exml";
	}

	protected createChildren(): void {
		super.childrenCreated();
		this.addEvent();
	}
	private addEvent() {
		this.m_pMainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLoginBtn, this);
	}

	private removeEvent(): void {
		this.m_pMainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLoginBtn, this);
	}

	private onClickLoginBtn(): void {
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.LOGIN));
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.MAINUI));
	}

	public release(): void {
		this.removeEvent();
	}
}