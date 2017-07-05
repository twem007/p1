var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core;
(function (core) {
    /**
     *
     * @author yuxuefeng
     *
     */
    var Layer = (function (_super) {
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
    __reflect(Layer.prototype, "core.Layer");
})(core || (core = {}));
