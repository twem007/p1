var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *
     * @author yuxuefeng
     *
     */
    var FrameEventCenter = (function () {
        function FrameEventCenter() {
            this.renderLoopItems = null;
            this.renderLoopItems = [];
        }
        FrameEventCenter.getInstance = function () {
            if (FrameEventCenter.s_instance == null) {
                FrameEventCenter.s_instance = new FrameEventCenter();
            }
            return FrameEventCenter.s_instance;
        };
        FrameEventCenter.prototype.regRenderLoop = function (stage) {
            if (stage != null) {
                this.preRenderTime = Date.now();
                stage.addEventListener(egret.Event.ENTER_FRAME, this.onRenderLoop, this);
            }
        };
        FrameEventCenter.prototype.onRenderLoop = function (event) {
            for (var i = 0, iLen = this.renderLoopItems.length; i < iLen; i++) {
                var item = this.renderLoopItems[i];
                if (item != null) {
                    item.onRenderLoop(Date.now() - this.preRenderTime);
                }
            }
            this.preRenderTime = Date.now();
        };
        FrameEventCenter.prototype.addRenderLoop = function (item) {
            var items = this.renderLoopItems;
            if (items.indexOf(item) == -1) {
                items.push(item);
            }
        };
        FrameEventCenter.prototype.removeRenderLoop = function (item) {
            var items = this.renderLoopItems;
            var index = items.indexOf(item);
            if (index != -1) {
                items.splice(index, 1);
            }
        };
        return FrameEventCenter;
    }());
    core.FrameEventCenter = FrameEventCenter;
    __reflect(FrameEventCenter.prototype, "core.FrameEventCenter");
})(core || (core = {}));
//# sourceMappingURL=FrameEventCenter.js.map