/**
 * 网络连接断开重连界面
 */
class BreakLineView extends core.EUIComponent {
	/**主组 */
	private m_pMainGroup: eui.Group;
	/**正在重连显示组 */
	private m_pLoadingGroup: eui.Group;
	/**重连中的读条 */
	private m_pProssectImg: eui.Image;
	/**读条组 */
	private m_pProssectGroup: eui.Group;
	/**光标组 */
	private m_pCursorGroup: eui.Group;
	/**重连之后确实没网络打开的组默认隐藏 */
	private m_pNoLinkGroup: eui.Group;
	/**在战斗之中要显示的组 */
	private m_pInCombatGroup: eui.Group;
	/**继续重连得按钮 */
	private m_pReconnectionBtn: eui.Image;
	/**返回主界面的按钮 */
	private m_pBackBtn: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/hint/GameDisconnectHintSkin.exml";
	}
	/**初始化子对象 */
	protected onShow() {
		super.onShow();
		this.changeProssect();
	}
	protected addListener() {
		super.addListener();
		this.m_pBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBackBtn, this);
		this.m_pReconnectionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickReconnectionBtn, this);
		core.EventCenter.getInstance().addEventListener(EventType.GAME_DISCONNECT_LINK, this.setUIVisible, this);
		// core.EventCenter.getInstance().addEventListener(RoomEvent.ENTER_ROOM, this.createRoom, this);
	}
	/**删除监听 */
	protected removeListener() {
		super.removeListener();
		this.stopProssect();
		this.m_pBackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBackBtn, this);
		this.m_pReconnectionBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickReconnectionBtn, this);
		core.EventCenter.getInstance().removeEventListener(EventType.GAME_DISCONNECT_LINK, this.setUIVisible, this);
		// core.EventCenter.getInstance().removeEventListener(RoomEvent.ENTER_ROOM, this.createRoom, this);
	}
	public onAdaptive() {
		UIManager.updataPoint(this.m_pNoLinkGroup, 667, 375);
		UIManager.updataPoint(this.m_pLoadingGroup, 667, 375);
	}
	public release() {
	}
	private setUIVisible() {
		this.m_pLoadingGroup.visible = false;
		this.m_pNoLinkGroup.visible = true;
	}
	/**返回主界面按钮 */
	private onClickBackBtn() {
		// MapManager.getInstance().destroy();
		// EventCenter.instance.sendMsg(EventType.RESET_GAMEUI);
		// AGame.R.notifyView(RootNav.ROOT_CLOSE);
		// AGame.R.notifyView(SceneNav.SCENE_MAIN_OPEN);
	}
	/**继续重连按钮 */
	private onClickReconnectionBtn() {
		this.m_pNoLinkGroup.visible = false;
		this.m_pLoadingGroup.visible = true;
		// Bootstrap.reconnect();
	}
	/**确定按钮 */
	private onClickSurnBtn() {

	}
	/**读条动画 */
	private changeProssect() {
		if (this.m_pProssectImg == null) return;
		this.stopProssect();
		this.m_pProssectImg.width = 0;
		this.m_pCursorGroup.width = 0;
		egret.Tween.get(this.m_pProssectImg).to({ width: this.m_pProssectGroup.width }, 1000).wait(100).call(() => (this.changeProssect()));
		egret.Tween.get(this.m_pCursorGroup).to({ width: this.m_pProssectGroup.width }, 1000).wait(100);
	}
	/**关闭读条 */
	private stopProssect() {
		egret.Tween.removeTweens(this.m_pProssectImg);
	}

	/**关闭界面 */
	private closeView() {
		// MapManager.getInstance().destroy();
		// EventCenter.instance.sendMsg(EventType.RESET_GAMEUI);
		// AGame.R.notifyView(RootNav.ROOT_CLOSE);
	}
	private createRoom(e: egret.Event) {
		// let roomData: RoomModel = e.data;
		// this.closeView();
		// this.enterFightView(roomData.mapID);
	}
	private enterFightView(mapId) {
		// if (MapManager.getInstance().isInit) {
		// 	return;
		// }
		// trace("创建战斗界面  " + mapId);
		// AGame.R.notifyView(CombatNav.COMBAT_CONTROL_OPEN);
		// MapManager.getInstance().enterMap(mapId);
	}
}