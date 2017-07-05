module core {
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
            let dataList: TickData[] = this.m_tickList;
            for (let i: number = dataList.length; i > 0; i--) {
                let data: TickData = dataList[i - 1];
                if (!data.isValid) {
                    dataList.splice(i - 1, 1);
                }
            }
            for (let i: number = 0, iLen: number = dataList.length; i < iLen; i++) {
                let data: TickData = dataList[i];
                if ((timeStamp - data.timestamp) > data.delay) {
                    data.timestamp = timeStamp;
                    data.count++;
                    if (data.callback) {
                        let t: number = egret.getTimer();
                        data.callback.call(data.thisObj, data.clone());
                        let t1: number = egret.getTimer();
                        if (t1 - t > 2) {
                            Log(`tick回调耗时:${t1 - t}`);
                        }
                    }
                    if (data.count == data.maxCount) {
                        data.isValid = false;
                    }
                }
            }
            return false;
        }

        public addTick(delay: number, replayCount: number, callback: Function, thisObj: any, ...args): void {
            let dataList: TickData[] = this.m_tickList;
            if (dataList) {
                for (let i: number = 0, iLen: number = dataList.length; i < iLen; i++) {
                    let data: TickData = dataList[i];
                    if (data.callback == callback && data.thisObj == thisObj && data.delay == delay && data.maxCount == replayCount) {
                        if (!data.isValid) {
                            data.isValid = true;
                            data.delay = delay;
                            data.count = 0;
                            data.maxCount = replayCount <= 0 ? Number.MAX_VALUE : replayCount;
                            data.callback = callback;
                            data.thisObj = thisObj;
                            data.args = args;
                            data.timestamp = egret.getTimer();
                            return;
                        }
                    }
                }
            } else {
                dataList = [];
                this.m_tickList = dataList;
            }
            let tick: TickData = new TickData();
            tick.delay = delay;
            tick.count = 0;
            tick.maxCount = replayCount <= 0 ? Number.MAX_VALUE : replayCount;
            tick.callback = callback;
            tick.thisObj = thisObj;
            tick.args = args;
            tick.timestamp = egret.getTimer();
            tick.isValid = true;
            dataList.push(tick);
        }

        public removeTick(callback: Function, thisObj: any): void {
            let dataList: TickData[] = this.m_tickList;
            if (dataList) {
                let tickData: TickData;
                for (let i: number = 0, iLen: number = dataList.length; i < iLen; i++) {
                    let data: TickData = dataList[i];
                    if (data.callback == callback && data.thisObj == thisObj) {
                        data.isValid = false;
                        return;
                    }
                }
            }
        }

        public removeTicks(thisObj: any): void {
            let dataList: TickData[] = this.m_tickList;
            if (dataList) {
                let tickData: TickData;
                for (let i: number = 0, iLen: number = dataList.length; i < iLen; i++) {
                    let data: TickData = dataList[i];
                    if (data.thisObj == thisObj) {
                        data.isValid = false;
                    }
                }
            }
        }

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

    export class TickData extends egret.HashObject {

        public delay: number;

        public count: number;

        public maxCount: number;

        public callback: Function;

        public thisObj: any;

        public args: any[];

        public timestamp: number;

        public isValid: boolean;

        public constructor() {
            super();
        }

        public clone(): TickData {
            let data: TickData = new TickData();
            data.delay = this.delay;
            data.count = this.count;
            data.maxCount = this.maxCount;
            data.callback = this.callback;
            data.thisObj = this.thisObj;
            data.args = this.args;
            data.isValid = this.isValid;
            return data;
        }
    }
}