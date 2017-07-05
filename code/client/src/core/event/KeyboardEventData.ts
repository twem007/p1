module core {
    export class KeyboardEventData extends core.EventData {

        constructor(messageID: string, data?: any) {
            super(messageID, data);
        }

        public getData(): KeyboardEvent {
            return this.messageData;
        }
    }
}