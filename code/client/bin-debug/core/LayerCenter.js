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
    var LayerCenter = (function () {
        function LayerCenter() {
        }
        LayerCenter.getInstance = function () {
            if (LayerCenter.s_instance == null) {
                LayerCenter.s_instance = new LayerCenter();
            }
            return LayerCenter.s_instance;
        };
        LayerCenter.prototype.init = function (stage) {
            if (stage) {
                this.stage = stage;
                this.layers = [];
                LayerCenter.stageWidth = stage.stageWidth;
                LayerCenter.stageHeight = stage.stageHeight;
            }
        };
        LayerCenter.prototype.addLayer = function (index, layer) {
            this.layers[index] = layer;
            this.stage.addChildAt(layer, index);
        };
        LayerCenter.prototype.getLayer = function (index) {
            return this.layers[index];
        };
        LayerCenter.prototype.removeLayer = function (index) {
            var layer = this.layers[index];
            if (layer) {
                if (layer.parent) {
                    layer.parent.removeChild(layer);
                }
                layer.removeChildren();
                this.layers[index] = null;
            }
        };
        return LayerCenter;
    }());
    core.LayerCenter = LayerCenter;
    __reflect(LayerCenter.prototype, "core.LayerCenter");
})(core || (core = {}));
//# sourceMappingURL=LayerCenter.js.map