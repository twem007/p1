var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 断线重连控制器
 */
var BreakLineController = (function (_super) {
    __extends(BreakLineController, _super);
    function BreakLineController(loadingUI) {
        return _super.call(this, ModuleEnum.BREAKLINE, loadingUI) || this;
    }
    /**
         * 预加载资源组
         */
    BreakLineController.prototype.getLoadGroup = function (data) {
        return [];
    };
    /**
     * 显示
     */
    BreakLineController.prototype.show = function (data) {
        if (!this.m_pBreakLineUI) {
            var breakLineUI = new BreakLineView();
            this.m_pBreakLineUI = breakLineUI;
        }
        core.LayerCenter.getInstance().getLayer(LayerEnum.HINTSEC).addChild(this.m_pBreakLineUI);
    };
    /**
     * 隐藏
     */
    BreakLineController.prototype.hide = function () {
        this.m_pBreakLineUI.hide();
    };
    BreakLineController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return BreakLineController;
}(core.Control));
__reflect(BreakLineController.prototype, "BreakLineController");
//# sourceMappingURL=BreakLineController.js.map