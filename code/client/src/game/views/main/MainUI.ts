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

	protected childrenCreated() {
		this.addListener();
		super.childrenCreated();
		core.SoundUtils.getInstance().playSound(1, 0);
		this.onAdaptive();
	}

	protected onHide(): void {
	}

	protected addListener() {
		core.EventManager.getInstance().addEventListener(egret.Event.RESIZE, this.onAdaptive, this);
		this.m_pHeroBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRankBtn, this);
	}

	protected removeListener(): void {
		core.EventManager.getInstance().removeEventListener(egret.Event.RESIZE, this.onAdaptive, this);
		this.m_pHeroBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRankBtn, this);
	}

	public onAdaptive() {
		
	}

	public release() {
		this.removeListener();
	}

	private onClickRankBtn() {
	}
}