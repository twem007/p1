var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 走马灯控制器
 */
var NoticeAnimController = (function (_super) {
    __extends(NoticeAnimController, _super);
    function NoticeAnimController(loadingUI) {
        return _super.call(this, ModuleEnum.NOTICEANIM, loadingUI) || this;
    }
    /**
         * 预加载资源组
         */
    NoticeAnimController.prototype.getLoadGroup = function (data) {
        return [];
    };
    /**
     * 显示
     */
    NoticeAnimController.prototype.show = function (data) {
        if (!this.m_pNoticeAnimUI) {
            var noticeAnimUI = new NoticeAnimView();
            this.m_pNoticeAnimUI = noticeAnimUI;
        }
        // this._map.init(this._mapId);
        // this._map.create();
        core.LayerCenter.getInstance().getLayer(LayerEnum.TOP).addChild(this.m_pNoticeAnimUI);
    };
    /**
     * 隐藏
     */
    NoticeAnimController.prototype.hide = function () {
        this.m_pNoticeAnimUI.hide();
    };
    NoticeAnimController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return NoticeAnimController;
}(core.Control));
__reflect(NoticeAnimController.prototype, "NoticeAnimController");
//# sourceMappingURL=NoticeAnimController.js.map