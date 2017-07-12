/**通用界面 */
class CommonHintView extends core.EUIComponent {
	/**文本 */
	private m_pLab: eui.Label;
	/**点击我知道了按钮 */
	private m_pKnowBtn: eui.Group;
	/**主组 */
	private m_pMainGroup: eui.Group;
	/**界面组 */
	private m_pMainComGroup: eui.Group;
	/**双按钮组 */
	private m_pTwoBtn: eui.Group;
	private m_pCloseBtn: eui.Group;
	private m_pSureBtn: eui.Group;
	/**界面需要的数据 */
	public m_pCommonData: CommonData;
	public constructor() {
		super();
		this.skinName = "resource/skins/hint/CommonHintSkin.exml";
	}
	protected onShow(): void {
		super.onShow();
		let commonData = this.m_pCommonData;
		Utils.setRichText(this.m_pLab, commonData.m_pText);
		if (commonData.m_pBtnType == 2) {
			this.m_pKnowBtn.visible = false;
			this.m_pTwoBtn.visible = true;
		}
	}
	protected addListener() {
		super.addListener();
		this.m_pKnowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMainBtn, this);
		this.m_pCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
		this.m_pSureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMainBtn, this);
	}
	protected removeListener() {
		super.removeListener();
		this.m_pKnowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMainBtn, this);
		this.m_pCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
		this.m_pSureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMainBtn, this);
	}
	public onAdaptive() {
		UIManager.updataPoint(this.m_pMainComGroup, 667, 375);
	}
	public release() {
	}

	private onClickClose() {
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.COMMON));
	}
	private onMainBtn() {
		SoundUtils.getInstance().playSound('9');
		let commonData = this.m_pCommonData;
		if (commonData.m_pFun != null) {
			commonData.m_pFun();
		}
		if (commonData.m_pCondition == CommonReturnType.BUTTON_RETURN_MAIN) {
			//返回主界面
		} else if (commonData.m_pCondition == CommonReturnType.BUTTON_RETURN_LOGIN) {
			//返回登录界面
		} else if (commonData.m_pCondition == CommonReturnType.BUTTON_RESGAME) {
			window.location.reload();
		}
		else {
			core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.COMMON));
		}
	}
}