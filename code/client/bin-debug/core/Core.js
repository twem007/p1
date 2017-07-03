var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *
     * @author
     *
     */
    var Core = (function () {
        function Core() {
        }
        Core.run = function (stage) {
            core.FrameEventCenter.getInstance().regRenderLoop(stage);
            core.LayerCenter.getInstance().init(stage);
        };
        return Core;
    }());
    core.Core = Core;
    __reflect(Core.prototype, "core.Core");
})(core || (core = {}));
//# sourceMappingURL=Core.js.map