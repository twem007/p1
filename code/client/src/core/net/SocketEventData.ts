module core {
	/**
     * 本类为webSocket事件数据类
     */
    export class SocketEventData extends EventData {

        public constructor(messageID: string, messageData?: core.ByteBuffer) {
            super(messageID, messageData);
        }
    }
}