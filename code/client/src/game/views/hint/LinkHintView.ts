/**
 * 转圈圈界面
 */
class LinkHintView extends core.EUIComponent {
	/**控制旋转图片位置的组 */
	private m_pLoadingGroup: eui.Group;
	private m_pHintGroup: eui.Group;
	private m_pHintLab: eui.Label;
	private m_pIntervalIndex: number;
	private m_pMainGroup: eui.Group;
	public constructor() {
		super();
		this.skinName = "resource/skins/hint/LinkHintSkin.exml";
	}
	/**初始化子对象 */
	protected onShow() {
		super.onShow();
		let loadingAnim: egret.MovieClip = core.MCFactory.instance.getMovieClip('loading', 'loading', true);
		loadingAnim.gotoAndPlay("run", -1);
		this.m_pLoadingGroup.addChild(loadingAnim);
		loadingAnim.scaleX = 0.6;
		loadingAnim.scaleY = 0.6;
		loadingAnim.alpha = 1;
		loadingAnim.x = 70;
		loadingAnim.y = 50;
		egret.clearInterval(this.m_pIntervalIndex);
		this.m_pIntervalIndex = egret.setInterval(this.hintLab, this, 10000);
	}
	protected addListener() {
		super.addListener();
	}
	/**删除监听 */
	protected removeListener() {
		super.removeListener();
		egret.clearInterval(this.m_pIntervalIndex);
	}
	public onAdaptive() {
		UIManager.updataPoint(this.m_pLoadingGroup, 685, 375);
	}

	private hintLab() {
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.LINK));
		core.TextUtils.showTextTip("网络较差，请到网络更好的地方体验游戏");
	}
}
