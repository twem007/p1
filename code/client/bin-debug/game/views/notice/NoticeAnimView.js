var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**走马灯公告界面 */
var NoticeAnimView = (function (_super) {
    __extends(NoticeAnimView, _super);
    function NoticeAnimView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/notice/NoticeHintAnimSkin.exml";
        return _this;
    }
    NoticeAnimView.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.m_pHintLab.text = null;
        NoticeAnimView.ISOPEN = true;
        this.noticeMsg();
        // if (MapManager.getInstance().isInit == false) {
        // 	this.m_pHintGroup.y = 135;
        // } else {
        // 	this.m_pHintGroup.y =core.LayerCenter.stageHeight - 30;
        // 	// this.m_pHintGroup.y=170;
        // }
    };
    NoticeAnimView.prototype.addListener = function () {
        _super.prototype.addListener.call(this);
        core.EventCenter.getInstance().addEventListener(EventType.COMBAT_LOADING_COMPLE, this.changePoint, this);
    };
    NoticeAnimView.prototype.onAdaptive = function () {
        UIManager.updataPoint(this.m_pHintGroup, 670, 182);
        this.changePoint();
    };
    NoticeAnimView.prototype.release = function () {
    };
    NoticeAnimView.prototype.removeListener = function () {
        _super.prototype.removeListener.call(this);
        core.EventCenter.getInstance().removeEventListener(EventType.COMBAT_LOADING_COMPLE, this.changePoint, this);
    };
    NoticeAnimView.prototype.onClickClose = function () {
    };
    NoticeAnimView.prototype.changePoint = function () {
        // if (MapManager.getInstance().isInit == true) {
        // 	this.m_pHintGroup.y = core.LayerCenter.stageHeight - 30;
        // 	// this.m_pHintGroup.y=170;
        // }
    };
    /**公告广播推送 */
    NoticeAnimView.prototype.noticeMsg = function (speed) {
        if (speed === void 0) { speed = 0.15; }
        var hintLab = this.m_pHintLab;
        var hintBg = this.m_pHintBgImg;
        var hintGroup = this.m_pWidthGroup;
        var text = NoticeAnimView.MSGDATA.shift();
        if (text) {
            var urlText = decodeURIComponent(text);
            Log("走马灯后端发的字符串" + urlText);
            Utils.setRichText(hintLab, urlText);
            hintLab.x = this.m_pWidthGroup.width;
            hintBg.scaleX = 0;
            egret.Tween.removeTweens(hintBg);
            egret.Tween.removeTweens(hintLab);
            egret.Tween.get(hintBg).to({ scaleX: 1 }, 300).wait((hintLab.width + hintGroup.width) / speed).to({ scaleX: 0 }, 300).call(this.noticeMsg, this);
            egret.Tween.get(hintLab).wait(300).to({ x: (hintGroup.x - hintLab.width) }, (hintLab.width + hintGroup.width) / speed);
        }
        else {
            core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.NOTICEANIM));
            NoticeAnimView.ISOPEN = false;
        }
    };
    return NoticeAnimView;
}(core.EUIComponent));
/**要输入的文本内容 */
// public static m_pText: string;
/**控制唯一的 */
NoticeAnimView.ISOPEN = false;
/**获取信息 */
NoticeAnimView.MSGDATA = [];
__reflect(NoticeAnimView.prototype, "NoticeAnimView");
//# sourceMappingURL=NoticeAnimView.js.map