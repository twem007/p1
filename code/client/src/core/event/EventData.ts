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

    export class ModuleEventData extends core.EventData {

        public moduleEnum: number;

        public preModule:number;

        constructor(messageID: string, moduleEnum: number, preModule?: number, data?: any) {
            super(messageID, data);
            this.moduleEnum = moduleEnum;
            this.preModule = preModule;
        }
    }
}