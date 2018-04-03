module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export class FrameEventCenter {

        private static s_instance: FrameEventCenter;

        private m_callbacks: Callback[];

        private m_stage: egret.Stage;

        private m_preTick: number;

        public constructor() {
            this.m_callbacks = [];
        }

        public static getInstance(): FrameEventCenter {
            if (FrameEventCenter.s_instance == null) {
                FrameEventCenter.s_instance = new FrameEventCenter();
            }
            return FrameEventCenter.s_instance;
        }

        public init(stage: egret.Stage): void {
            this.m_stage = stage;
            if (this.m_stage) {
                this.m_preTick = Date.now();
                this.m_stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            } else {
                egret.log('Stage为null不能开启帧循环监听');
            }
        }

        private onEnterFrame(event: egret.Event): void {
            let curTick: number = Date.now();
            const callbacks: Callback[] = this.m_callbacks.concat();
            if (callbacks) {
                for (let i: number = 0, iLen: number = callbacks.length; i < iLen; i++) {
                    let callback: Callback = callbacks[i];
                    callback.bindCallback(curTick - this.m_preTick);
                }
            }
            this.m_preTick = curTick;
        }
        /**
         * 注册事件监听
         */
        public addFrameEventListener(callback: (offset: number) => void, thisObj: any): void {
            if (callback && thisObj) {
                let data: Callback = new Callback(callback, thisObj);
                this.m_callbacks.push(data);
            }
        }
        /**
         * 移除事件监听
         */
        public removeFrameEventListener(callback: (offset: number) => void, thisObj: any): void {
            let callbacks: Callback[] = this.m_callbacks;
            if (callbacks) {
                for (let i: number = callbacks.length; i > 0; i--) {
                    let data: Callback = callbacks[i - 1];
                    if (data.callback == callback && data.thisObj == thisObj) {
                        callbacks.splice(i - 1, 1);
                        break;
                    }
                }
            }
        }
    }
}
