module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export class FrameEventCenter {

        private static s_instance: FrameEventCenter;

        private renderLoopItems: core.IRenderLoop[] = null;
        private preRenderTime: number;

        public constructor() {
            this.renderLoopItems = [];
        }
        
        public static getInstance(): FrameEventCenter {
            if(FrameEventCenter.s_instance == null) {
                FrameEventCenter.s_instance = new FrameEventCenter();
            }
            return FrameEventCenter.s_instance;
        }

        public regRenderLoop(stage:egret.Stage):void{
            if(stage != null){
                this.preRenderTime = Date.now();
                stage.addEventListener(egret.Event.ENTER_FRAME,this.onRenderLoop,this);
            }
        }
        
        private onRenderLoop(event:egret.Event):void{
            for(var i: number = 0,iLen: number = this.renderLoopItems.length;i < iLen; i++){
                var item: IRenderLoop = this.renderLoopItems[i];
                if(item != null){
                    item.onRenderLoop(Date.now() - this.preRenderTime);
                }
            }
            this.preRenderTime = Date.now();
        }

        public addRenderLoop(item: IRenderLoop):void{
            var items: IRenderLoop[] = this.renderLoopItems;
            if(items.indexOf(item) == -1) {
                items.push(item);
            }
        }
        
        public removeRenderLoop(item: IRenderLoop):void{
            var items: IRenderLoop[] = this.renderLoopItems;
            var index: number = items.indexOf(item);
            if(index != -1) {
                items.splice(index,1);
            }
        }
    }
}
