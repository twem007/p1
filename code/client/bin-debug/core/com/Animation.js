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
    var Animation = /** @class */ (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this.loop = core.FrameEventCenter.getInstance();
            return _this;
        }
        Animation.prototype.play = function () {
            this.loop.addFrameEventListener(this.onRenderLoop, this);
        };
        Animation.prototype.stop = function () {
            this.loop.removeFrameEventListener(this.onRenderLoop, this);
        };
        Animation.prototype.onRenderLoop = function (offset) {
            if (this.parent == null) {
                this.stop();
            }
        };
        return Animation;
    }(core.Component));
    core.Animation = Animation;
})(core || (core = {}));
//# sourceMappingURL=Animation.js.map