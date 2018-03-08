/**
 * 界面入口按钮组件有红点
 */
class EntranceBtn extends core.EUIComponent {
	public constructor() {
		super();
	}
	/**图片 */
	public m_pImg: eui.Image;
	/**红点 */
	public m_pRedDot: eui.Image;
	/**带叹号的红点 */
	public m_pMarkRedDot: eui.Image;
	protected createChildren() {
		super.createChildren();
		this.addListener();
	}

	/**
	 * 添加监听
	 */
	protected addListener(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchButton, this);
	}

	private onTouchButton(event: egret.TouchEvent): void {
		core.SoundUtils.getInstance().playSound(2);
	}

	/**
	 * 删除监听
	 */
	protected removeListener(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchButton, this);
	}

	public release(): void {
		this.removeListener();
	}
}