var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/login/LoginsSkin.exml";
        return _this;
    }
    LoginUI.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.m_pLogo.visible = false;
        this.m_pAccount.text = name;
        this.onAdaptive();
    };
    LoginUI.prototype.addListener = function () {
        _super.prototype.addListener.call(this);
        core.EventCenter.getInstance().addEventListener(egret.Event.RESIZE, this.onAdaptive, this);
        this.m_pLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.m_pPassword.addEventListener(egret.Event.CHANGE, this.onChangePassword, this);
    };
    LoginUI.prototype.removeListener = function () {
        _super.prototype.removeListener.call(this);
        core.EventCenter.getInstance().removeEventListener(egret.Event.RESIZE, this.onAdaptive, this);
        this.m_pLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.m_pPassword.removeEventListener(egret.Event.CHANGE, this.onChangePassword, this);
    };
    /**更新舞台 */
    LoginUI.prototype.onAdaptive = function () {
        UIManager.updataPoint(this.m_pLogoGroup, 668, 308);
        UIManager.updataPoint(this.m_pAccountGroup, 668, 334);
        UIManager.updataPoint(this.m_pLoginBtn, 667, 614);
    };
    LoginUI.prototype.onButtonClick = function (event) {
        SoundUtils.getInstance().playSound(2);
        if (this.m_pLogoGroup.visible) {
            this.m_pLogoGroup.visible = false;
            this.m_pAccountGroup.visible = true;
            this.m_pLoginBtn.source = "logoBoomUI_json.loading_btn_1";
        }
        else {
            if (this.m_pAccount.text != null && this.m_pAccount.text != "") {
                this.release();
                core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.LOGIN));
                core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.MAINUI));
            }
            else {
                core.TextUtils.showTextTip("请输入账号");
            }
        }
    };
    /*控制密码输入长度**/
    LoginUI.prototype.onChangePassword = function () {
        var password = this.m_pPassword.text;
        if (password.length >= 20) {
            password = password.substring(0, 20);
            this.m_pPassword.text = password;
        }
    };
    return LoginUI;
}(core.EUIComponent));
__reflect(LoginUI.prototype, "LoginUI");
//# sourceMappingURL=LoginUI.js.map