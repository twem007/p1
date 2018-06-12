module core {
    /**
     * 键盘事件数据类
     */
    export class KeyboardEventData extends core.EventData {

        constructor(messageID: string, data?: any) {
            super(messageID, data);
        }
        /**
         * 当前事件数据
         * @return KeyboardEvent
         */
        public getData(): KeyboardEvent {
            return this.messageData;
        }
    }
}