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
    __reflect(Core.prototype, "core.Core");
})(core || (core = {}));
