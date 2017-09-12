var core;
(function (core) {
    /**
     *
     * @author
     *
     */
    var LayerCenter = /** @class */ (function () {
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
                stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
                this.m_layers = [];
                LayerCenter.stageWidth = stage.stageWidth;
                LayerCenter.stageHeight = stage.stageHeight;
            }
        };
        LayerCenter.prototype.onStageResize = function (event) {
            LayerCenter.stageWidth = this.stage.stageWidth;
            LayerCenter.stageHeight = this.stage.stageHeight;
            core.EventCenter.getInstance().sendEvent(new core.EventData(egret.Event.RESIZE));
        };
        LayerCenter.prototype.addLayer = function (index, layer) {
            this.m_layers[index] = layer;
            this.stage.addChildAt(layer, index);
        };
        LayerCenter.prototype.getLayer = function (index) {
            return this.m_layers[index];
        };
        LayerCenter.prototype.removeLayer = function (index) {
            var layer = this.m_layers[index];
            if (layer) {
                if (layer.parent) {
                    layer.parent.removeChild(layer);
                }
                layer.removeChildren();
                this.m_layers[index] = null;
            }
        };
        return LayerCenter;
    }());
    core.LayerCenter = LayerCenter;
})(core || (core = {}));
//# sourceMappingURL=LayerCenter.js.map