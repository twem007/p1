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
    return EntranceBtn;
}(eui.Component));
__reflect(EntranceBtn.prototype, "EntranceBtn");
//# sourceMappingURL=EntranceBtn.js.map