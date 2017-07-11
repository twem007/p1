var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 主界面控制器
 */
var MainController = (function (_super) {
    __extends(MainController, _super);
    function MainController(loadingUI) {
        return _super.call(this, ModuleEnum.MAINUI, loadingUI) || this;
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
        this.m_pMainUI.hide();
    };
    MainController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return MainController;
}(core.Control));
__reflect(MainController.prototype, "MainController");
//# sourceMappingURL=MainController.js.map