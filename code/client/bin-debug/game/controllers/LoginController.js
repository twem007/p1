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
/**
 * 登录界面控制器
 */
var LoginController = /** @class */ (function (_super) {
    __extends(LoginController, _super);
    function LoginController() {
        return _super.call(this, ModuleEnum.LOGIN) || this;
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
        if (this.m_pLoginUI && this.m_pLoginUI.parent) {
            this.m_pLoginUI.parent.removeChild(this.m_pLoginUI);
        }
        this.m_pLoginUI = null;
    };
    LoginController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return LoginController;
}(core.Control));
//# sourceMappingURL=LoginController.js.map