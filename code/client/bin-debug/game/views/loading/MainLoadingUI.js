var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainLoadingUI = (function (_super) {
    __extends(MainLoadingUI, _super);
    function MainLoadingUI() {
        var _this = _super.call(this) || this;
        /**要加载资源的数量*/
        _this.m_pResNum = 0;
        //资源组完成数
        _this.m_pResGroupsCompleteCount = 0;
        //资源项数
        _this.m_pResItemCount = 0;
        //资源项完成数
        _this.m_pResItemCompleteCount = 0;
        _this.skinName = 'resource/skins/loading/LoadingSkin.exml';
        return _this;
    }
    MainLoadingUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.m_pProgressImg.mask = this.m_pProgressMask;
        this.m_pProgressMask.width = 0;
        this.m_pStateLbl.text = "首次进游戏需加载更多资源，疯狂载入中...";
    };
    MainLoadingUI.prototype.setProgress = function (progress) {
        if (!this.m_pProgressMask)
            return;
        var percent = progress.curGroupLoaded / progress.curGroupTotal;
        this.m_pProgressMask.width = this.m_pProgressGroup.width * percent;
        this.m_pLoginLbl.text = "正在加载游戏" + Math.floor(percent * 100 << 0) + "%";
        this.m_pProgressStar.x = this.m_pProgressMask.width - this.m_pProgressStar.width;
        this.m_pProgressStar.visible = this.m_pProgressStar.x >= 0;
    };
    MainLoadingUI.prototype.show = function () {
        core.LayerCenter.getInstance().getLayer(LayerEnum.LOADING).addChild(this);
    };
    MainLoadingUI.prototype.release = function () {
    };
    MainLoadingUI.prototype.hide = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    MainLoadingUI.prototype.updateAdaptive = function () {
        UIManager.updataPoint(this.m_pMainGroup, 667, 375);
        UIManager.updataPoint(this.m_pProgressGroup, 667, 653);
    };
    return MainLoadingUI;
}(core.EUIComponent));
__reflect(MainLoadingUI.prototype, "MainLoadingUI", ["core.ILoadingUI"]);
//# sourceMappingURL=MainLoadingUI.js.map