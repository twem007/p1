module core {
    export class EventData extends egret.HashObject implements core.IMessage {

        public messageID: string;

        public messageData: any;

        constructor(messageID: string, messageData?: any) {
            super();
            this.messageID = messageID;
            this.messageData = messageData;
        }
    }
}