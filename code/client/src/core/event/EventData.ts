module core {
    export class EventData extends egret.HashObject implements core.IMessage {

        public messageID: string | number;

        public messageData: any;

        constructor(messageID: string | number, messageData?: any) {
            super();
            this.messageID = messageID;
            this.messageData = messageData;
        }
    }
}