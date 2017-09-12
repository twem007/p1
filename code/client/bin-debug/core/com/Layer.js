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
var core;
(function (core) {
    /**
     *
     * @author yuxuefeng
     *
     */
    var Layer = /** @class */ (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            _this.touchChildren = true;
            return _this;
        }
        return Layer;
    }(egret.DisplayObjectContainer));
    core.Layer = Layer;
})(core || (core = {}));
//# sourceMappingURL=Layer.js.map