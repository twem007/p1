var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommonController = (function (_super) {
    __extends(CommonController, _super);
    function CommonController(loadingUI) {
        return _super.call(this, ModuleEnum.COMMON, loadingUI) || this;
    }
    /**
         * 预加载资源组
         */
    CommonController.prototype.getLoadGroup = function (data) {
        return [];
    };
    /**
     * 显示
     */
    CommonController.prototype.show = function (data) {
        this.m_pCommonUI.m_pCommonData = data.messageData;
        if (!this.m_pCommonUI) {
            var commonUI = new CommonHintView();
            this.m_pCommonUI = commonUI;
        }
        core.LayerCenter.getInstance().getLayer(LayerEnum.HINT).addChild(this.m_pCommonUI);
    };
    /**
     * 隐藏
     */
    CommonController.prototype.hide = function () {
        this.m_pCommonUI.hide();
    };
    CommonController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return CommonController;
}(core.Control));
__reflect(CommonController.prototype, "CommonController");
//# sourceMappingURL=CommonController.js.map