var core;
(function (core) {
    /**
     *
     * @author
     *
     */
    var Core = /** @class */ (function () {
        function Core() {
        }
        Core.run = function (stage) {
            egret.ImageLoader.crossOrigin = 'anonymous';
            core.FrameEventCenter.getInstance().init(stage);
            core.LayerCenter.getInstance().init(stage);
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                core.WebUtils.addKeyboardListener();
            }
            RES.setMaxRetryTimes(3);
        };
        return Core;
    }());
    core.Core = Core;
})(core || (core = {}));
//# sourceMappingURL=Core.js.map