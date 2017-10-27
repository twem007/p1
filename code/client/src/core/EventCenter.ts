module core {
	/**
	 *  
	 * @author yuxuefeng
	 *
	 */
    export class EventCenter {

        private static s_instance: EventCenter;

        private m_callbackMaps: Dictionary<EventCallBack[]>;

        private m_sendBuffer: EventData[];

        public constructor() {
            this.m_callbackMaps = new Dictionary<EventCallBack[]>();
            this.m_sendBuffer = [];
        }

        public static getInstance(): EventCenter {
            if (EventCenter.s_instance == null) {
                EventCenter.s_instance = new EventCenter();
            }
            return EventCenter.s_instance;
        }
        /**
         * 注册事件监听
         */
        public addEventListener(messageID: string, callback: (data: EventData) => void, thisObj: any, index?: number): void {
            if (callback && thisObj) {
                let data: EventCallBack = new EventCallBack(callback, thisObj);
                data.messageID = messageID;
                data.index = index ? index : 0;
                let callbacks: EventCallBack[] = this.m_callbackMaps.get(messageID);
                if (callbacks) {
                    callbacks.push(data);
                    callbacks.sort(this.sortIndex);
                } else {
                    this.m_callbackMaps.add(messageID, [data]);
                }
            }
        }

        private sortIndex(a: EventCallBack, b: EventCallBack): number {
            return b.index - a.index;
        }
        /**
         * 移除事件监听
         */
        public removeEventListener(messageID: string, callback: (data: EventData) => void, thisObj: any): void {
            let callbacks: EventCallBack[] = this.m_callbackMaps.get(messageID);
            if (callbacks) {
                for (let i: number = 0, iLen: number = callbacks.length; i < iLen; i++) {
                    let data: EventCallBack = callbacks[i];
                    if (data.callback === callback && data.thisObj === thisObj) {
                        data.isValid = false;
                    }
                }
            }
        }
        /**
         * 发送消息
         */
        public sendEvent(message: EventData): void {
            this.m_sendBuffer.push(message);
            egret.callLater(this.sendAll, this);
        }
        /**
         * 发送所有消息
         */
        private sendAll(): void {
            let t: number = Date.now();
            let max: number = 0;
            let max_data: EventCallBack;
            while (this.m_sendBuffer.length > 0) {
                let event: EventData = this.m_sendBuffer.shift();
                let dataList: EventCallBack[] = this.m_callbackMaps.get(event.messageID);
                if (dataList) {
                    for (let i: number = dataList.length; i > 0; i--) {
                        let data: EventCallBack = dataList[i - 1];
                        if (!data.isValid) {
                            dataList.splice(i - 1, 1);
                        }
                    }
                    for (let i: number = 0, iLen: number = dataList.length; i < iLen; i++) {
                        let data: EventCallBack = dataList[i];
                        let t1: number = Date.now();
                        data.callback.call(data.thisObj, event);
                        let t1_end: number = Date.now();
                        if (t1_end - t1 >= max) {
                            max = t1_end - t1;
                            max_data = data;
                        }
                    }
                } else {
                    egret.log("事件ID:" + event.messageID + "无监听回调");
                }
            }
            let t_end: number = Date.now() - t;
            if (DebugUtils.EVENT_LOG && t_end > DebugUtils.EVENT_LIMIT && max_data) {
                egret.log(`事件派发总耗时：${t_end} 最高耗时事件：${max_data.messageID} 耗时：${max}`);
            }
        }
    }

    class EventCallBack extends Callback implements IMessage {

        public index: number;

        public messageID: string;

        public isValid: boolean;

        constructor(callback: (data?: any) => void, thisObj: any) {
            super(callback, thisObj);
            this.isValid = true;
        }

        public clone(): EventCallBack {
            let data: EventCallBack = new EventCallBack(<any>this.callback, this.thisObj);
            data.index = this.index;
            data.messageID = this.messageID;
            data.isValid = this.isValid;
            return data;
        }
    }
}
