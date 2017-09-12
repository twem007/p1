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
 * 界面入口按钮组件有红点
 */
var EntranceBtn = /** @class */ (function (_super) {
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
//# sourceMappingURL=EntranceBtn.js.map