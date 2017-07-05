module core {
	/**
	 *
	 * @author 
	 *
	 */
    export class LayerCenter {

        private static s_instance: LayerCenter;

        private m_layers: Layer | EUILayer[];

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
                stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
                this.m_layers = [];
                LayerCenter.stageWidth = stage.stageWidth;
                LayerCenter.stageHeight = stage.stageHeight;
            }
        }

        private onStageResize(event: egret.Event): void {
            LayerCenter.stageWidth = this.stage.stageWidth;
            LayerCenter.stageHeight = this.stage.stageHeight;
            EventCenter.getInstance().sendEvent(new EventData(egret.Event.RESIZE));
        }

        public addLayer(index: number, layer: core.Layer | core.EUILayer): void {
            this.m_layers[index] = layer;
            this.stage.addChildAt(layer, index);
        }

        public getLayer(index: number): core.Layer | core.EUILayer {
            return this.m_layers[index];
        }

        public removeLayer(index: number): void {
            var layer: core.Layer | core.EUILayer = this.m_layers[index];
            if (layer) {
                if (layer.parent) {
                    layer.parent.removeChild(layer);
                }
                layer.removeChildren();
                this.m_layers[index] = null;
            }
        }

        public static stageWidth: number;

        public static stageHeight: number;
    }
}
