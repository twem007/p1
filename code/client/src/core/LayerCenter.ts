module core {
	/**
	 *
	 * @author 
	 *
	 */
    export class LayerCenter {

        private static s_instance: LayerCenter;

        private layers: egret.DisplayObjectContainer[];

        public stage: egret.Stage;

        public constructor() {
        }

        public static getInstance(): LayerCenter {
            if (LayerCenter.s_instance == null) {
                LayerCenter.s_instance = new LayerCenter();
            }
            return LayerCenter.s_instance;
        }

        public init(stage: egret.Stage): void {
            if (stage) {
                this.stage = stage;
                this.layers = [];
                LayerCenter.stageWidth = stage.stageWidth;
                LayerCenter.stageHeight = stage.stageHeight;
            }
        }

        public addLayer(index: number, layer: core.Layer | core.EUILayer): void {
            this.layers[index] = layer;
            this.stage.addChildAt(layer, index);
        }

        public getLayer(index: number): core.Layer | core.EUILayer {
            return this.layers[index];
        }

        public removeLayer(index: number): void {
            var layer: core.Layer | core.EUILayer = this.layers[index];
            if (layer) {
                if (layer.parent) {
                    layer.parent.removeChild(layer);
                }
                layer.removeChildren();
                this.layers[index] = null;
            }
        }

        public static stageWidth: number;

        public static stageHeight: number;
    }
}
