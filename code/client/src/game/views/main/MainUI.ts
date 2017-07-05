class MainUI extends core.EUIComponent {
	public constructor() {
		super();
		this.skinName = "resource/skins/main/MainSkin.exml";
		core.EventCenter.getInstance().addEventListener(egret.Event.RESIZE, this.onResize, this);
	}

	private onResize(data: core.EventData): void {
		// core.LayerCenter.stageWidth;
		// core.LayerCenter.stageHeight;
	}

	public m_pMainGroup: eui.Group;
	public m_pPlayerBtn: eui.Group;
	public m_pPlayerbgImg: eui.Image;
	public m_pPlayerIconImg: eui.Image;
	public m_pPlayerNameLab: eui.Label;
	public m_pPlayerNameLab0: eui.Label;
	public m_pModEndlessGroup: eui.Group;
	public m_pModTeamGroup: eui.Group;
	public m_pModTeamBtn: eui.Image;
	public m_pModTimeLimitGroup: eui.Group;
	public m_pRightGroup: eui.Group;
	public m_pMenuGroup: eui.Group;
	public m_pMenuBg: eui.Image;
	public m_pNoticeBtn: eui.Image;
	public m_pTeachBtn: eui.Image;
	public m_pSetBtn: eui.Image;
	public m_pMailBtn: eui.Image;
	public m_pMailRedDot: eui.Image;
	public m_pQuestionBtn: eui.Group;
	public m_pQuestionRedDot: eui.Image;
	public m_pMenuBtn: eui.Image;

	protected createChildren(): void {
		super.childrenCreated();
		this.addEvent();
	}
	private addEvent() {
		// core.LayerCenter.getInstance().getLayer(LayerEnum.TOP).addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLoginBtn, this);
		this.m_pModTimeLimitGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLoginBtn, this);

	}
	private removeEvent(): void {

	}
	private onClickLoginBtn(): void {
		this.hide();
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.LOGIN));
	}
	private hide(): void {
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.MAINUI));
	}
	public release(): void {

	}
}