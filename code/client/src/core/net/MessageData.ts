module core {
	/**
	 *	
	 * @author 
	 *
	 */
	export class MessageData extends EventData {

		public constructor(messageID: string, messageData: any = {}) {
			super(messageID, messageData);
		}
	}
}
