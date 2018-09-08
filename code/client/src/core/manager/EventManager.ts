module core {
	/**
	 * 事件管理类
	 * 实现功能：
	 * 1、默认派发逻辑由发送事件触发，并延迟到下帧执行
	 * 2、允许设置事件优先级
	 * 3、设置每帧派发事件的上限、防止单帧执行事件过多
	 * 4、监测性能耗时较多的回调事件，方便性能优化。
	 */
	export class EventManager {

		private static s_instance: EventManager;
		/**
		 * 事件回调字典
		 */
		private m_callbackMaps: Dictionary<EventCallBack[]>;
		/**
		 * 发送缓存池
		 */
		private m_sendBuffer: EventData[];

		public constructor() {
			this.m_callbackMaps = new Dictionary<EventCallBack[]>();
			this.m_sendBuffer = [];
		}

		public static getInstance(): EventManager {
			if (EventManager.s_instance == null) {
				EventManager.s_instance = new EventManager();
			}
			return EventManager.s_instance;
		}

		/**
		 * 注册事件监听
		 * @param  {string|number} messageID		事件ID
		 * @param  {(data:EventData)=>void} callback	事件回调
		 * @param  {any} thisObj	this绑定
		 * @param  {number=0} index	优先级 数字越小优先级越高
		 */
		public addEventListener(messageID: string | number, callback: (data: core.EventData) => void, thisObj: any, index: number = 0): void {
			if (callback && thisObj) {
				let data: EventCallBack = new EventCallBack(callback, thisObj);
				data.index = index < 0 ? 0 : index;
				data.messageID = messageID;
				let callbacks: EventCallBack[] = this.m_callbackMaps.get(messageID);
				if (callbacks) {
					for (let i: number = 0, iLen: number = callbacks.length; i < iLen; i++) {
						if (data.index < callbacks[i].index) {
							callbacks.splice(i, 0, data);
							return;
						}
					}
					callbacks.push(data);
				} else {
					this.m_callbackMaps.add(messageID, [data]);
				}
			}
		}
		/**
		 * 移除事件监听
		 * @param  {string} messageID	事件ID
		 * @param  {(data:EventData)=>void} callback
		 * @param  {any} thisObj
		 */
		public removeEventListener(messageID: string | number, callback: (data: EventData) => void, thisObj: any): void {
			let callbacks: EventCallBack[] = this.m_callbackMaps.get(messageID);
			if (callbacks) {
				for (let i: number = callbacks.length; i > 0; i--) {
					let data: EventCallBack = callbacks[i - 1];
					if (data.callback == callback && data.thisObj === thisObj) {
						data.isValid = false;
						callbacks.splice(i - 1, 1);
						break;
					}
				}
			}
		}
        
		/**
		 * 发送消息
		 * @param  {EventData} message
		 */
		public sendEvent(message: EventData): void {
			this.m_sendBuffer.push(message);
			egret.callLater(this.sendAll, this);
		}
		/**
		 * 立即发送缓存池中的消息
		 */
		public flush(): void {
			this.sendAll();
		}
        /**
         * 发送缓存池中的消息
         */
		private sendAll(): void {
			let t: number = Date.now();
			let max: number = 0;
			let max_data: EventCallBack;
			let buffLen: number = this.m_sendBuffer.length;
			let sendBuff: EventData[] = this.m_sendBuffer;
			const buffMax: number = 100;
			if (buffLen > buffMax) {
				sendBuff = this.m_sendBuffer.splice(0, buffMax);
				egret.callLater(this.sendAll, this);
				egret.log(`分帧剩余未处理请求数：${this.m_sendBuffer.length}`);
			}
			while (sendBuff.length > 0) {
				let event: EventData = sendBuff.shift();
				let dataList: EventCallBack[] = this.m_callbackMaps.get(event.messageID);
				if (dataList) {
					dataList = dataList.concat();
					for (let i: number = 0, iLen: number = dataList.length; i < iLen; i++) {
						let data: EventCallBack = dataList[i];
						if (data.isValid) {
							let t1: number = Date.now();
							data.bindCallback(event);
							let t1_end: number = Date.now();
							if (t1_end - t1 > max) {
								max = t1_end - t1;
								max_data = data;
							}
						}
					}
				} else {
					// egret.log("事件ID:" + event.messageID + "无监听回调");
				}
			}
			let t_end: number = Date.now() - t;
			const allLimit: number = 10;
			const limit: number = 5;
			if (t_end > allLimit) {
				if (max_data && max > limit) {
					egret.log(`单帧事件派发耗时：${t_end} 最高耗时事件：${max_data.messageID} 耗时：${max}`);
				} else {
					egret.log(`单帧事件派发耗时：${t_end}`);
				}
			}
		}
	}
	/**
	 * 事件回调数据
	 */
	class EventCallBack extends Callback {

		public index: number;

		public messageID: string | number;

		public isValid: boolean;
		/**
		 * @param  {(data?:any)=>void} callback	回调函数
		 * @param  {any} thisObj	this绑定
		 */
		constructor(callback: (data?: any) => void, thisObj: any) {
			super(callback, thisObj);
			this.isValid = true;
		}
	}
}
