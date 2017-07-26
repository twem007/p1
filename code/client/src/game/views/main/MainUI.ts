class MainUI extends core.EUIComponent {
	/**背景底图 */
	public m_pBgImg: eui.Image;
	/**右上角组 */
	public m_pRightTow: eui.Group;
	/**设置按钮 */
	public m_pGameSetBtn: EntranceBtn;
	/**邮件按钮 */
	public m_pMailBtn: EntranceBtn;
	/**右下组 */
	public m_pRightLowGroup: eui.Group;
	/**英雄按钮 */
	public m_pHeroBtn: EntranceBtn;
	/**碎片按钮 */
	public m_pChipBtn: EntranceBtn;
	/**背包按钮 */
	public m_pBagBtn: EntranceBtn;
	/**好友按钮 */
	public m_pFriendBtn: EntranceBtn;
	/**成长按钮 */
	public m_pGrowUpBtn: EntranceBtn;
	/**货币组件 */
	public m_pCurrency: Currency;
	/**网络延迟组件 */
	public m_pLinkDelay: LinkDelay;

	public constructor() {
		super();
		this.skinName = "resource/skins/main/MainSkin.exml";
	}
	protected onShow(): void {
		super.onShow();
		SoundUtils.getInstance().playSound('25', 0);
	}
	protected addListener() {
		super.addListener();
		this.m_pHeroBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRankBtn, this);
	}

	protected removeListener(): void {
		super.removeListener();
		this.m_pHeroBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRankBtn, this);
	}

	public onAdaptive() {
		UIManager.updataPoint(this.m_pBgImg, 667, 375);
		UIManager.rightBelowAdaptive(this.m_pRightLowGroup, 1067, 704);
	}

	public release() {
		super.release();
	}

	private onClickRankBtn() {
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.MAINUI));
		GameModeManager.getInstance().enterGame(GameTypeEnum.EXERCISE);
	}
}