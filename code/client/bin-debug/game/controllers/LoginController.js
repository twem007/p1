var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 登录界面控制器
 */
var LoginController = (function (_super) {
    __extends(LoginController, _super);
    function LoginController(loadingUI) {
        return _super.call(this, ModuleEnum.LOGIN, loadingUI) || this;
    }
    /**
     * 预加载资源组
     */
    LoginController.prototype.getLoadGroup = function (data) {
        return ['soundUI', 'animUI'];
    };
    /**
     * 显示
     */
    LoginController.prototype.show = function (data) {
        if (!this.m_pLoginUI) {
            var loginUI = new LoginUI();
            this.m_pLoginUI = loginUI;
        }
        core.LayerCenter.getInstance().getLayer(LayerEnum.UI).addChild(this.m_pLoginUI);
    };
    /**
     * 隐藏
     */
    LoginController.prototype.hide = function () {
        this.m_pLoginUI.hide();
    };
    LoginController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return LoginController;
}(core.Control));
__reflect(LoginController.prototype, "LoginController");
//# sourceMappingURL=LoginController.js.map