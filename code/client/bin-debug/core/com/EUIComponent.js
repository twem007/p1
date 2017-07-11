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
    var EUIComponent = (function (_super) {
        __extends(EUIComponent, _super);
        function EUIComponent() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onShow, _this);
            return _this;
        }
        /**
         * 显示
         */
        EUIComponent.prototype.onShow = function () {
            this.addListener();
            this.onAdaptive();
        };
        /**
         * 添加监听
         */
        EUIComponent.prototype.addListener = function () {
            core.EventCenter.getInstance().addEventListener(egret.Event.RESIZE, this.onAdaptive, this);
        };
        /**
         * 删除监听
         */
        EUIComponent.prototype.removeListener = function () {
            core.EventCenter.getInstance().removeEventListener(egret.Event.RESIZE, this.onAdaptive, this);
        };
        /**
         * 自适应显示
         */
        EUIComponent.prototype.onAdaptive = function () {
        };
        /**
         * 隐藏显示
         */
        EUIComponent.prototype.hide = function () {
            this.removeListener();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return EUIComponent;
    }(eui.Component));
    core.EUIComponent = EUIComponent;
    __reflect(EUIComponent.prototype, "core.EUIComponent");
})(core || (core = {}));
//# sourceMappingURL=EUIComponent.js.map