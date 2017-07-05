module com_main {
	/**
	 * 事件中心
	 */
	export class EventCenter extends egret.EventDispatcher {
		private static _instance:EventCenter;

		public constructor()
		{
			super();
			EventCenter._instance = this;
		}

		public static get instance():EventCenter
		{
			if(!EventCenter._instance)
			{
				EventCenter._instance = new EventCenter();
			}
			return EventCenter._instance;
		}

		public static addEvent(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number){
			EventCenter.instance.addEventListener(type, listener, thisObject, useCapture, priority);
		}
		public static removeEvent(type: string, listener: Function, thisObject: any, useCapture?: boolean){
			EventCenter.instance.removeEventListener(type, listener, thisObject, useCapture);
		}
		public static sendEvent(event: egret.Event){
			EventCenter.instance.dispatchEvent(event);
		}


		/**
		 * 发送事件
		 */ 
		public sendMsg(type: string, data?: any, bubbles?: boolean, cancelable?: boolean)
		{
			EventCenter.instance.dispatchEvent(new egret.Event(type, bubbles, cancelable, data));
		}


		/**
		 * 监听事件
		 */ 
		public addMsg(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number)
		{
			EventCenter.instance.addEventListener(type, listener, thisObject, useCapture, priority);
		}

		/**
		 * 监听事件一次
		 */ 
		public addOnceMsg(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number)
		{
			EventCenter.instance.once(type, listener, thisObject, useCapture, priority);
		}


		/**
		 * 删除事件
		 */ 
		public removeMsg(type: string, listener: Function, thisObject: any, useCapture?: boolean)
		{
			EventCenter.instance.removeEventListener(type,listener,thisObject, useCapture);
		}
	}
}
