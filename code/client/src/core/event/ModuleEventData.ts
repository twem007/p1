module core {
    export class ModuleEventData extends core.EventData {

        public moduleEnum: number;

        constructor(messageID: string, moduleEnum: number, data?: any) {
            super(messageID, data);
            this.moduleEnum = moduleEnum;
        }
    }
}