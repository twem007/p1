module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export class EventCenter {

        private static s_instance: EventCenter;

        private callbackMaps: Object;

        private sendBuffer: EventData[];

        public constructor() {
            this.callbackMaps = {};
            this.sendBuffer = [];
        }

        public static getInstance(): EventCenter {
            if (EventCenter.s_instance == null) {
                EventCenter.s_instance = new EventCenter();
            }
            return EventCenter.s_instance;
        }

        public addEventListener(messageID: string, callback: (data: IMessage) => void, thisObj: any, index?: number): void {
            if (callback) {
                let callbacks: { callback: (data: IMessage) => void; thisObj: any }[] = this.callbackMaps[messageID];
                if (callbacks != null) {
                    if (index) {
                        callbacks.splice(index < 0 ? 0 : index, 0, { callback: callback, thisObj: thisObj });
                    } else {
                        callbacks.push({ callback: callback, thisObj: thisObj });
                    }
                } else {
                    this.callbackMaps[messageID] = [{ callback: callback, thisObj: thisObj }];
                }
            }
        }

        public removeEventListener(messageID: string, callback: (data: IMessage) => void, thisObj: any): void {
            var callbacks: { callback: (data: IMessage) => void; thisObj: any }[] = this.callbackMaps[messageID];
            if (callbacks != null) {
                for (let i: number = callbacks.length; i > 0; i--) {
                    if (callbacks[i - 1].thisObj === thisObj) {
                        callbacks.splice(i - 1, 1);
                    }
                }
            }
        }

        public sendEvent(message: EventData): void {
            this.sendBuffer.push(message);
            egret.startTick(this.onTickerLoop, this);
        }

        public onTickerLoop(timeStamp: number): boolean {
            let buffer: EventData[] = this.sendBuffer;
            if (buffer != null) {
                if (buffer.length > 0) {
                    let messageData: EventData = buffer.shift();
                    let datas: { callback: (data: IMessage) => void; thisObj: any }[] = this.callbackMaps[messageData.messageID];
                    if (datas != null) {
                        for (let i: number = 0, iLen: number = datas.length; i < iLen; i++) {
                            let data: { callback: (data: IMessage) => void; thisObj: any } = datas[i];
                            if (data.callback) {
                                data.callback.call(data.thisObj, messageData);
                            }
                        }
                    } else {
                        console.log("事件ID:" + messageData.messageID + "无监听回调");
                    }
                } else {
                    egret.stopTick(this.onTickerLoop, this);
                }
            }
            return false;
        }
    }
}
