module core {

    export class InputManager {

        private static s_instance: InputManager;

        private m_keyMap: Dictionary<KeyData>;

        constructor() {
            this.m_keyMap = new Dictionary<KeyData>();
        }

        public addKeyListener(key: number, callback: () => void, thisObj: any): void {
            let data: KeyData = this.m_keyMap.get(key);
            if (!data) {
                data = new KeyData(key);
            }
            data.callbacks.push(new KeyCallBack(callback, thisObj));
            this.m_keyMap.add(key, data);
        }

        public removeKeyListener(key: number, callback: () => void, thisObj: any): void {
            let data: KeyData = this.m_keyMap.get(key);
            if (data) {
                let list: KeyCallBack[] = data.callbacks;
                for (let i: number = 0, iLen: number = list.length; i < iLen; i++) {
                    let item: KeyCallBack = list[i];
                    if (item && item.callback === callback && item.thisObj === thisObj) {
                        item.isValid = false;
                    }
                }
            }
        }

        public enableKey(key: number, enable: boolean): void {
            this.m_keyMap.get(key).keyEnable = enable;
        }

        public enable(enable: boolean): void {
            let map: Dictionary<KeyData> = this.m_keyMap;
            let values: KeyData[] = map.values;
            for (let i: number = 0, iLen: number = values.length; i < iLen; i++) {
                values[i].keyEnable = enable;
            }
        }

        public sendKey(key: number): void {
            let data: KeyData = this.m_keyMap.get(key);
            if (data) {
                let list: KeyCallBack[] = data.callbacks;
                for (let i: number = list.length; i > 0; i--) {
                    let data: KeyCallBack = list[i - 1];
                    if (!data.isValid) {
                        list.splice(i - 1, 1);
                    }
                }
                for (let i: number = 0, iLen: number = list.length; i < iLen; i++) {
                    let data: KeyCallBack = list[i];
                    data.callback.call(data.thisObj);
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

        public callbacks: KeyCallBack[];

        constructor(key: number) {
            this.key = key;
            this.keyEnable = true;
            this.callbacks = [];
        }
    }

    class KeyCallBack extends Callback {

        public isValid: boolean;

        constructor(callback: (data?: any) => void, thisObj: any) {
            super(callback, thisObj);
            this.isValid = true;
        }
    }
}