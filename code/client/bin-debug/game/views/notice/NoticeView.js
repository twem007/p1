var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**公告界面 */
var NoticeView = (function (_super) {
    __extends(NoticeView, _super);
    function NoticeView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/notice/NoticeHintSkin.exml";
        return _this;
    }
    NoticeView.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
    };
    NoticeView.prototype.addListener = function () {
        _super.prototype.addListener.call(this);
        this.m_pKnowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
    };
    NoticeView.prototype.onAdaptive = function () {
        UIManager.updataPoint(this.m_pMainNoticeGroup, 665, 362);
    };
    NoticeView.prototype.removeListener = function () {
        _super.prototype.removeListener.call(this);
        this.m_pKnowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
    };
    NoticeView.prototype.release = function () {
    };
    NoticeView.prototype.onClickClose = function () {
        core.SoundUtils.getInstance().playSound('9');
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.NOTICE));
    };
    NoticeView.prototype.setText = function () {
        if (this.m_pText != null) {
            var urlText = decodeURIComponent(this.m_pText);
            Log("公告" + urlText);
            Utils.setRichText(this.m_pLab, urlText);
        }
    };
    return NoticeView;
}(core.EUIComponent));
__reflect(NoticeView.prototype, "NoticeView");
//# sourceMappingURL=NoticeView.js.map