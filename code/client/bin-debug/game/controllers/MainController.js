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
 * 主界面控制器
 */
var MainController = /** @class */ (function (_super) {
    __extends(MainController, _super);
    function MainController() {
        return _super.call(this, ModuleEnum.MAINUI) || this;
    }
    /**
         * 预加载资源组
         */
    MainController.prototype.getLoadGroup = function (data) {
        return ['mainUI'];
    };
    /**
     * 显示
     */
    MainController.prototype.show = function (data) {
        if (!this.m_pMainUI) {
            var mainUI = new MainUI();
            this.m_pMainUI = mainUI;
        }
        core.LayerCenter.getInstance().getLayer(LayerEnum.UI).addChild(this.m_pMainUI);
    };
    /**
     * 隐藏
     */
    MainController.prototype.hide = function () {
        if (this.m_pMainUI && this.m_pMainUI.parent) {
            this.m_pMainUI.parent.removeChild(this.m_pMainUI);
        }
    };
    MainController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return MainController;
}(core.Control));
//# sourceMappingURL=MainController.js.map