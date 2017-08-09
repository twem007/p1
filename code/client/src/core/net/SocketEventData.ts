module core {
	/**
	 *	
	 * @author 
	 *
	 */
    export class SocketEventData extends EventData {

        public constructor(messageID: string, messageData?: core.ByteBuffer) {
            super(messageID, messageData);
        }
    }
}