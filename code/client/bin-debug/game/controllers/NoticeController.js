var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NoticeController = (function (_super) {
    __extends(NoticeController, _super);
    function NoticeController(loadingUI) {
        return _super.call(this, ModuleEnum.NOTICE, loadingUI) || this;
    }
    /**
         * 预加载资源组
         */
    NoticeController.prototype.getLoadGroup = function (data) {
        return [];
    };
    /**
     * 显示
     */
    NoticeController.prototype.show = function (data) {
        if (!this.m_pNoticeUI) {
            var noticeUI = new NoticeView();
            this.m_pNoticeUI = noticeUI;
        }
        // this._map.init(this._mapId);
        // this._map.create();
        core.LayerCenter.getInstance().getLayer(LayerEnum.HINTSEC).addChild(this.m_pNoticeUI);
    };
    /**
     * 隐藏
     */
    NoticeController.prototype.hide = function () {
        this.m_pNoticeUI.hide();
    };
    NoticeController.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    return NoticeController;
}(core.Control));
__reflect(NoticeController.prototype, "NoticeController");
//# sourceMappingURL=NoticeController.js.map