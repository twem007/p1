/**公告界面 */
class NoticeView extends core.EUIComponent {
	public constructor() {
		super();
		this.skinName = "resource/skins/notice/NoticeHintSkin.exml";
	}
	/**文本 */
	private m_pLab: eui.Label;
	/**点击我知道了按钮 */
	private m_pKnowBtn: eui.Group;
	/**主组 */
	private m_pMainGroup: eui.Group;
	/**界面组 */
	private m_pMainNoticeGroup: eui.Group;
	public m_pText: string;
	protected onShow(): void {
		super.onShow();
	}
	protected addListener() {
		super.addListener();
		this.m_pKnowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
	}
	public onAdaptive() {
		UIManager.updataPoint(this.m_pMainNoticeGroup, 665, 362);
	}
	protected removeListener() {
	    super.removeListener();
		this.m_pKnowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
	}
	public release() {
	}
	private onClickClose() {
		core.SoundUtils.getInstance().playSound('9');
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.NOTICE));
	}
	public setText() {
		if (this.m_pText != null) {
			let urlText = decodeURIComponent(this.m_pText);
			Log("公告" + urlText);
			Utils.setRichText(this.m_pLab, urlText);
		}
	}
}
