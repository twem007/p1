var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/main/MainSkin.exml";
        core.EventCenter.getInstance().addEventListener(egret.Event.RESIZE, _this.onResize, _this);
        return _this;
    }
    MainUI.prototype.onResize = function (data) {
        // core.LayerCenter.stageWidth;
        // core.LayerCenter.stageHeight;
    };
    MainUI.prototype.createChildren = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEvent();
    };
    MainUI.prototype.addEvent = function () {
        this.m_pModTimeLimitGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLoginBtn, this);
    };
    MainUI.prototype.removeEvent = function () {
    };
    MainUI.prototype.onClickLoginBtn = function () {
        this.hide();
        GameModeManager.getInstance().enterGame(GameTypeEnum.EXERCISE);
    };
    MainUI.prototype.hide = function () {
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.MAINUI));
    };
    MainUI.prototype.release = function () {
    };
    return MainUI;
}(core.EUIComponent));
__reflect(MainUI.prototype, "MainUI");
