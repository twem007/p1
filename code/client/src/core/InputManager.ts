module core {

    export class InputManager {

        private static s_instance: InputManager;

        private m_keyMap: Dictionary<KeyData>;

        constructor() {
            this.m_keyMap = new Dictionary<KeyData>();
        }

        public addInputListener(input: number, callback: (input: InputData) => void, thisObj: any): void {
            let data: KeyData = this.m_keyMap.get(input);
            if (!data) {
                data = new KeyData(input);
                this.m_keyMap.add(input, data);
            }
            let callbackData: Callback = new Callback(callback, thisObj);
            data.callbacks.push(callbackData);
        }

        public removeInputListener(input: number, callback: (input: InputData) => void, thisObj: any): void {
            let data: KeyData = this.m_keyMap.get(input);
            if (data) {
                let list: Callback[] = data.callbacks;
                for (let i: number = list.length; i > 0; i--) {
                    let item: Callback = list[i - 1];
                    if (item && item.callback === callback && item.thisObj === thisObj) {
                        list.splice(i - 1, 1);
                        return;
                    }
                }
            }
        }
        /**
         * 移除所有监听
         */
        public removeAllListener(): void {
            this.m_keyMap.clear();
        }

        public enableInput(input: number, enable: boolean): void {
            this.m_keyMap.get(input).keyEnable = enable;
        }

        public set enable(enable: boolean) {
            let map: Dictionary<KeyData> = this.m_keyMap;
            let values: KeyData[] = map.values;
            for (let i: number = 0, iLen: number = values.length; i < iLen; i++) {
                values[i].keyEnable = enable;
            }
        }

        public sendInput(input: number, priority?: number): void {
            let data: KeyData = this.m_keyMap.get(input);
            if (data && data.keyEnable) {
                let list: Callback[] = data.callbacks;
                for (let i: number = list.length; i > 0; i--) {
                    let callback: Callback = list[i - 1];
                    let inputData: InputData = new InputData();
                    inputData.curInput = input;
                    inputData.priorityInput = priority;
                    callback.bindCallback(inputData);
                }
            }
        }

        public static getInstance(): InputManager {
            if (!InputManager.s_instance) {
                InputManager.s_instance = new InputManager();
            }
            return InputManager.s_instance;
        }
    }

    class KeyData {

        public key: number;

        public keyEnable: boolean;

        public callbacks: Callback[];

        constructor(key: number) {
            this.key = key;
            this.keyEnable = true;
            this.callbacks = [];
        }
    }

    export class InputData {

        public curInput: number;

        public priorityInput: number;

    }
}