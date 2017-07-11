var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LinkController = (function (_super) {
    __extends(LinkController, _super);
    function LinkController(loadingUI) {
        return _super.call(this, ModuleEnum.LINK, loadingUI) || this;
    }
    /**
         * 预加载资源组
         */
    LinkController.prototype.getLoadGroup = function (data) {
        return [];
    };
    /**
     * 显示
     */
    LinkController.prototype.show = function (data) {
        if (!this.m_pLinkUI) {
            var linkUI = new LinkHintView();
            this.m_pLinkUI = linkUI;
        }
        core.LayerCenter.getInstance().getLayer(LayerEnum.HINTSEC).addChild(this.m_pLinkUI);
    };
    /**
     * 隐藏
     */
    LinkController.prototype.hide = function () {
        this.m_pLinkUI.hide();
    };
    LinkController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return LinkController;
}(core.Control));
__reflect(LinkController.prototype, "LinkController");
//# sourceMappingURL=LinkController.js.map