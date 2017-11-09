module core {
	/**
	 *
	 * @author 
	 *
	 */
    export class LayerCenter {

        private static s_instance: LayerCenter;

        private m_layerDic: Dictionary<core.Layer | core.EUILayer>;

        public stage: egret.Stage;

        public static stageWidth: number;

        public static stageHeight: number;

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
                this.m_layerDic = new Dictionary<core.Layer | core.EUILayer>();
                LayerCenter.stageWidth = stage.stageWidth;
                LayerCenter.stageHeight = stage.stageHeight;
            }
        }

        private onStageResize(event: egret.Event): void {
            LayerCenter.stageWidth = this.stage.stageWidth;
            LayerCenter.stageHeight = this.stage.stageHeight;
            EventCenter.getInstance().sendEvent(new EventData(egret.Event.RESIZE));
        }

        private updateLayer(): void {
            let keys: number[] = this.m_layerDic.keys.concat();
            keys.sort(function (a: number, b: number): number {
                return a - b;
            });
            for (let i: number = 0, iLen: number = keys.length; i < iLen; i++) {
                let layer: core.Layer | core.EUILayer = this.m_layerDic.get(keys[i]);
                if (!layer.parent) {
                    this.stage.addChildAt(layer, i);
                } else {
                    layer.parent.setChildIndex(layer, i);
                }
            }
        }

        public addLayer(index: number, layer: core.Layer | core.EUILayer): void {
            this.m_layerDic.add(index, layer);
            egret.callLater(this.updateLayer, this);
        }

        public getLayer(index: number): core.Layer | core.EUILayer {
            return this.m_layerDic.get(index);
        }

        public removeLayer(index: number): core.Layer | core.EUILayer {
            let layer: core.Layer | core.EUILayer = this.m_layerDic.remove(index);
            this.updateLayer();
            return layer;
        }
    }
}
