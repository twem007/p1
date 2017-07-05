var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/login/LoginsSkin.exml";
        return _this;
    }
    LoginUI.prototype.createChildren = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEvent();
    };
    LoginUI.prototype.addEvent = function () {
        this.m_pMainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLoginBtn, this);
    };
    LoginUI.prototype.removeEvent = function () {
        this.m_pMainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLoginBtn, this);
    };
    LoginUI.prototype.onClickLoginBtn = function () {
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.LOGIN));
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.MAINUI));
    };
    LoginUI.prototype.release = function () {
        this.removeEvent();
    };
    return LoginUI;
}(core.EUIComponent));
__reflect(LoginUI.prototype, "LoginUI");
