var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * 转圈圈界面
 */
var LinkHintView = (function (_super) {
    __extends(LinkHintView, _super);
    function LinkHintView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/hint/LinkHintSkin.exml";
        return _this;
    }
    /**初始化子对象 */
    LinkHintView.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        var loadingAnim = core.MCFactory.instance.getMovieClip('loading_json', 'loading_png', 'loading', true);
        loadingAnim.gotoAndPlay("run", -1);
        this.m_pLoadingGroup.addChild(loadingAnim);
        loadingAnim.scaleX = 0.6;
        loadingAnim.scaleY = 0.6;
        loadingAnim.alpha = 1;
        loadingAnim.x = 70;
        loadingAnim.y = 50;
        egret.clearInterval(this.m_pIntervalIndex);
        this.m_pIntervalIndex = egret.setInterval(this.hintLab, this, 10000);
    };
    LinkHintView.prototype.addListener = function () {
        _super.prototype.addListener.call(this);
    };
    /**删除监听 */
    LinkHintView.prototype.removeListener = function () {
        _super.prototype.removeListener.call(this);
        egret.clearInterval(this.m_pIntervalIndex);
    };
    LinkHintView.prototype.onAdaptive = function () {
        UIManager.updataPoint(this.m_pLoadingGroup, 685, 375);
    };
    LinkHintView.prototype.hintLab = function () {
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.LINK));
        core.TextUtils.showTextTip("网络较差，请到网络更好的地方体验游戏");
    };
    return LinkHintView;
}(core.EUIComponent));
__reflect(LinkHintView.prototype, "LinkHintView");
//# sourceMappingURL=LinkHintView.js.map