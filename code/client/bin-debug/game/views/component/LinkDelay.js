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
 * 网络延迟的组件
 */
var LinkDelay = (function (_super) {
    __extends(LinkDelay, _super);
    function LinkDelay() {
        return _super.call(this) || this;
    }
    return LinkDelay;
}(eui.Component));
__reflect(LinkDelay.prototype, "LinkDelay");
//# sourceMappingURL=LinkDelay.js.map