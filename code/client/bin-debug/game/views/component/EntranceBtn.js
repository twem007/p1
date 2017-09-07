var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 界面入口按钮组件有红点
 */
var EntranceBtn = (function (_super) {
    __extends(EntranceBtn, _super);
    function EntranceBtn() {
        return _super.call(this) || this;
    }
    EntranceBtn.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 添加监听
     */
    EntranceBtn.prototype.addListener = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchButton, this);
    };
    EntranceBtn.prototype.onTouchButton = function (event) {
        SoundUtils.getInstance().playSound(2);
    };
    /**
     * 删除监听
     */
    EntranceBtn.prototype.removeListener = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchButton, this);
    };
    return EntranceBtn;
}(core.EUIComponent));
__reflect(EntranceBtn.prototype, "EntranceBtn");
//# sourceMappingURL=EntranceBtn.js.map