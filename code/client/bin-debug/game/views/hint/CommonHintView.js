var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**通用界面 */
var CommonHintView = (function (_super) {
    __extends(CommonHintView, _super);
    function CommonHintView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/hint/CommonHintSkin.exml";
        return _this;
    }
    CommonHintView.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        var commonData = this.m_pCommonData;
        Utils.setRichText(this.m_pLab, commonData.m_pText);
        if (commonData.m_pBtnType == 2) {
            this.m_pKnowBtn.visible = false;
            this.m_pTwoBtn.visible = true;
        }
    };
    CommonHintView.prototype.addListener = function () {
        _super.prototype.addListener.call(this);
        this.m_pKnowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMainBtn, this);
        this.m_pCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
        this.m_pSureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMainBtn, this);
    };
    CommonHintView.prototype.removeListener = function () {
        _super.prototype.removeListener.call(this);
        this.m_pKnowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMainBtn, this);
        this.m_pCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
        this.m_pSureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMainBtn, this);
    };
    CommonHintView.prototype.onAdaptive = function () {
        UIManager.updataPoint(this.m_pMainComGroup, 667, 375);
    };
    CommonHintView.prototype.release = function () {
    };
    CommonHintView.prototype.onClickClose = function () {
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.COMMON));
    };
    CommonHintView.prototype.onMainBtn = function () {
        SoundUtils.getInstance().playSound('9');
        var commonData = this.m_pCommonData;
        if (commonData.m_pFun != null) {
            commonData.m_pFun();
        }
        if (commonData.m_pCondition == CommonReturnType.BUTTON_RETURN_MAIN) {
        }
        else if (commonData.m_pCondition == CommonReturnType.BUTTON_RETURN_LOGIN) {
        }
        else if (commonData.m_pCondition == CommonReturnType.BUTTON_RESGAME) {
            window.location.reload();
        }
        else {
            core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.COMMON));
        }
    };
    return CommonHintView;
}(core.EUIComponent));
__reflect(CommonHintView.prototype, "CommonHintView");
//# sourceMappingURL=CommonHintView.js.map