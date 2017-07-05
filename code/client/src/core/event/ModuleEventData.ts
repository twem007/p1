module core {
    export class ModuleEventData extends core.EventData {

        public moduleEnum: number;

        public preModule: number;

        constructor(messageID: string, moduleEnum: number, preModule?: number, data?: any) {
            super(messageID, data);
            this.moduleEnum = moduleEnum;
            this.preModule = preModule;
        }
    }
}