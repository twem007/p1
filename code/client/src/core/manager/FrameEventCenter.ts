module core {
	/**
     * 帧循环管理器
     * 本类为帧循环监听的管理类，用于统一管理帧循环事件的添加和移除，方便开发。
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
        /**
         * 初始化
         * @param  {egret.Stage} stage  舞台
         */
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
         * 添加事件监听
         * @param  {(offset:number)=>void} callback 帧循环回调 offset为帧间隔
         * @param  {any} thisObj    this绑定
         */
        public addFrameEventListener(callback: (offset: number) => void, thisObj: any): void {
            if (callback && thisObj) {
                let data: Callback = new Callback(callback, thisObj);
                this.m_callbacks.push(data);
            }
        }
        /**
         * 移除事件监听
         * @param  {(offset:number)=>void} callback
         * @param  {any} thisObj
         */
        public removeFrameEventListener(callback: (offset: number) => void, thisObj: any): void {
            let callbacks: Callback[] = this.m_callbacks;
            if (callbacks) {
                for (let i: number = callbacks.length; i > 0; i--) {
                    let data: Callback = callbacks[i - 1];
                    if (data.callback == callback && data.thisObj == thisObj) {
                        callbacks.splice(i - 1, 1);
                    }
                }
            }
        }
        /**
         * 移除对象的所有帧循环监听
         * @param  {any} thisObj
         */
        public removeFrameEventListeners(thisObj: any): void {
            let callbacks: Callback[] = this.m_callbacks;
            if (callbacks) {
                for (let i: number = callbacks.length; i > 0; i--) {
                    let data: Callback = callbacks[i - 1];
                    if (data.thisObj == thisObj) {
                        callbacks.splice(i - 1, 1);
                    }
                }
            }
        }
    }
}
