module core {
	/**
	 *  层级管理器
     *  舞台对象及舞台宽高都应该通过本类获取。
     *  实现功能：
     *  1、添加及删除层，通过索引得到对应层级
     *  2、监听舞台大小变化并派发舞台变化事件
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
        /**
         * 初始化管理器
         * @param  {egret.Stage} stage
         */
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
            EventManager.getInstance().sendEvent(new EventData(egret.Event.RESIZE));
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
        /**
         * 添加层
         * @param  {number} index   层索引，索引越小层级越低,最小值为0
         * @param  {core.Layer|core.EUILayer} layer 层对象
         */
        public addLayer(index: number, layer: core.Layer | core.EUILayer): void {
            index = index < 0 ? 0 : index;
            if (!this.m_layerDic.get(index)) {
                this.m_layerDic.add(index, layer);
                egret.callLater(this.updateLayer, this);
            } else {
                egret.error(`索引为${index}的层已存在`)
            }
        }
        /**
         * 通过层索引获取层对象
         * @param  {number} index   层索引
         */
        public getLayer(index: number): core.Layer | core.EUILayer {
            return this.m_layerDic.get(index);
        }

        /**
         * 通过层索引移除层对象
         * @param  {number} index
         */
        public removeLayer(index: number): core.Layer | core.EUILayer {
            let layer: core.Layer | core.EUILayer = this.m_layerDic.remove(index);
            this.updateLayer();
            return layer;
        }
    }
}
