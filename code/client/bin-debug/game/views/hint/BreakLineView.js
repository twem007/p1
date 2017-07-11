var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 网络连接断开重连界面
 */
var BreakLineView = (function (_super) {
    __extends(BreakLineView, _super);
    function BreakLineView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/hint/GameDisconnectHintSkin.exml";
        return _this;
    }
    /**初始化子对象 */
    BreakLineView.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.changeProssect();
    };
    BreakLineView.prototype.addListener = function () {
        _super.prototype.addListener.call(this);
        this.m_pBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBackBtn, this);
        this.m_pReconnectionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickReconnectionBtn, this);
        core.EventCenter.getInstance().addEventListener(EventType.GAME_DISCONNECT_LINK, this.setUIVisible, this);
        // core.EventCenter.getInstance().addEventListener(RoomEvent.ENTER_ROOM, this.createRoom, this);
    };
    /**删除监听 */
    BreakLineView.prototype.removeListener = function () {
        _super.prototype.removeListener.call(this);
        this.stopProssect();
        this.m_pBackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBackBtn, this);
        this.m_pReconnectionBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickReconnectionBtn, this);
        core.EventCenter.getInstance().removeEventListener(EventType.GAME_DISCONNECT_LINK, this.setUIVisible, this);
        // core.EventCenter.getInstance().removeEventListener(RoomEvent.ENTER_ROOM, this.createRoom, this);
    };
    BreakLineView.prototype.onAdaptive = function () {
        UIManager.updataPoint(this.m_pNoLinkGroup, 667, 375);
        UIManager.updataPoint(this.m_pLoadingGroup, 667, 375);
    };
    BreakLineView.prototype.release = function () {
    };
    BreakLineView.prototype.setUIVisible = function () {
        this.m_pLoadingGroup.visible = false;
        this.m_pNoLinkGroup.visible = true;
    };
    /**返回主界面按钮 */
    BreakLineView.prototype.onClickBackBtn = function () {
        // MapManager.getInstance().destroy();
        // EventCenter.instance.sendMsg(EventType.RESET_GAMEUI);
        // AGame.R.notifyView(RootNav.ROOT_CLOSE);
        // AGame.R.notifyView(SceneNav.SCENE_MAIN_OPEN);
    };
    /**继续重连按钮 */
    BreakLineView.prototype.onClickReconnectionBtn = function () {
        this.m_pNoLinkGroup.visible = false;
        this.m_pLoadingGroup.visible = true;
        // Bootstrap.reconnect();
    };
    /**确定按钮 */
    BreakLineView.prototype.onClickSurnBtn = function () {
    };
    /**读条动画 */
    BreakLineView.prototype.changeProssect = function () {
        var _this = this;
        if (this.m_pProssectImg == null)
            return;
        this.stopProssect();
        this.m_pProssectImg.width = 0;
        this.m_pCursorGroup.width = 0;
        egret.Tween.get(this.m_pProssectImg).to({ width: this.m_pProssectGroup.width }, 1000).wait(100).call(function () { return (_this.changeProssect()); });
        egret.Tween.get(this.m_pCursorGroup).to({ width: this.m_pProssectGroup.width }, 1000).wait(100);
    };
    /**关闭读条 */
    BreakLineView.prototype.stopProssect = function () {
        egret.Tween.removeTweens(this.m_pProssectImg);
    };
    /**关闭界面 */
    BreakLineView.prototype.closeView = function () {
        // MapManager.getInstance().destroy();
        // EventCenter.instance.sendMsg(EventType.RESET_GAMEUI);
        // AGame.R.notifyView(RootNav.ROOT_CLOSE);
    };
    BreakLineView.prototype.createRoom = function (e) {
        // let roomData: RoomModel = e.data;
        // this.closeView();
        // this.enterFightView(roomData.mapID);
    };
    BreakLineView.prototype.enterFightView = function (mapId) {
        // if (MapManager.getInstance().isInit) {
        // 	return;
        // }
        // trace("创建战斗界面  " + mapId);
        // AGame.R.notifyView(CombatNav.COMBAT_CONTROL_OPEN);
        // MapManager.getInstance().enterMap(mapId);
    };
    return BreakLineView;
}(core.EUIComponent));
__reflect(BreakLineView.prototype, "BreakLineView");
//# sourceMappingURL=BreakLineView.js.map