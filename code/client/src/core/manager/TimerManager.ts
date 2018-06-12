module core {
    /**
     * 定时器管理器
     * 本类为setTimeout及setInterval和Timer的替代实现，主要是方便程序中Timer事件的生命周期管理，使用起来更为便利。
     * 程序中如用到setTimeout，setInterval及Timer的地方应尽量选择此方案。
     */
    export class TimerManager {

        private static s_instance: TimerManager;

        private m_tickList: TickData[];

        public constructor() {
            if (TimerManager.s_instance) {
                throw new Error('单例类不可实例化');
            }
            egret.startTick(this.onTick, this);
            this.m_tickList = [];
        }

        private onTick(timeStamp: number): boolean {
            let dataList: TickData[] = this.m_tickList.concat();
            for (let i: number = 0, iLen: number = dataList.length; i < iLen; i++) {
                let data: TickData = dataList[i];
                if ((timeStamp - data.timestamp) > data.delay && data.isValid) {
                    data.timestamp = timeStamp;
                    data.count++;
                    if (data.callback) {
                        let t: number = egret.getTimer();
                        data.callback.call(data.thisObj, data);
                        let t1: number = egret.getTimer();
                        if (t1 - t > 2) {
                            egret.log(`tick回调耗时:${t1 - t}`);
                        }
                    }
                    if (data.count == data.maxCount) {
                        data.isValid = false;
                    }
                }
            }
            return false;
        }
        /**
         * 添加计时器
         * @param  {number} delay       执行周期执行，延迟delay毫秒后执行。
         * @param  {number} replayCount 执行次数，当replayCount <= 0时为无限执行
         * @param  {Function} callback  回调函数，每周期执行一次回调函数
         * @param  {any} thisObj        this绑定
         * @param  {} ...args           透传参数
         */
        public addTick(delay: number, replayCount: number, callback: Function, thisObj: any, ...args): void {
            let dataList: TickData[] = this.m_tickList;
            if (!dataList) {
                dataList = [];
                this.m_tickList = dataList;
            }
            let tick: TickData = new TickData(callback, thisObj);
            tick.delay = delay;
            tick.count = 0;
            tick.maxCount = replayCount <= 0 ? Number.MAX_VALUE : replayCount;
            tick.args = args;
            tick.timestamp = egret.getTimer();
            tick.isValid = true;
            dataList.push(tick);
        }
        /**
         * 通过回调函数移除对应监听
         * @param  {Function} callback  回调函数
         * @param  {any} thisObj    this绑定
         */
        public removeTick(callback: Function, thisObj: any): void {
            let dataList: TickData[] = this.m_tickList;
            if (dataList) {
                let tickData: TickData;
                for (let i: number = dataList.length; i > 0; i--) {
                    let data: TickData = dataList[i - 1];
                    if (!data.isValid || (data.callback == callback && data.thisObj == thisObj)) {
                        dataList.splice(i - 1, 1);
                    }
                }
            }
        }
        /**
         * 移除this绑定相关的计时器
         * @param  {any} thisObj
         */
        public removeTicks(thisObj: any): void {
            let dataList: TickData[] = this.m_tickList;
            if (dataList) {
                let tickData: TickData;
                for (let i: number = dataList.length; i > 0; i--) {
                    let data: TickData = dataList[i - 1];
                    if (!data.isValid || data.thisObj == thisObj) {
                        dataList.splice(i - 1, 1);
                    }
                }
            }
        }
        /**
         * 移除所有计时器
         */
        public removeAllTicks(): void {
            this.m_tickList.length = 0;
        }

        public static get instance(): TimerManager {
            if (TimerManager.s_instance == null) {
                TimerManager.s_instance = new TimerManager();
            }
            return TimerManager.s_instance;
        }
    }

    export class TickData extends core.Callback {
        
        public delay: number;

        public count: number;

        public maxCount: number;

        public args: any[];

        public timestamp: number;

        public isValid: boolean;

        public constructor(callback: Function, thisObj: any) {
            super(callback, thisObj);
        }
    }
}