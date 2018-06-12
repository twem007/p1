module core {
    /**
     * 输入管理器
     * 本类设计初衷是为跨平台的输入差异提供基础的封装，降低代码耦合度。
     */
    export class InputManager {

        private static s_instance: InputManager;

        private m_keyMap: Dictionary<KeyData>;

        constructor() {
            this.m_keyMap = new Dictionary<KeyData>();
        }
        /**
         * 添加输出监听
         * @param  {number} input   输入类型
         * @param  {(input:InputData)=>void} callback   输入回调
         * @param  {any} thisObj    this绑定
         */
        public addInputListener(input: number, callback: (input: InputData) => void, thisObj: any): void {
            let data: KeyData = this.m_keyMap.get(input);
            if (!data) {
                data = new KeyData(input);
                this.m_keyMap.add(input, data);
            }
            let callbackData: Callback = new Callback(callback, thisObj);
            data.callbacks.push(callbackData);
        }
        /**
         * 移除输入监听
         * @param  {number} input   输入类型
         * @param  {(input:InputData)=>void} callback   输入回调
         * @param  {any} thisObj    this绑定
         */
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
       
        /**
         * 输入类型开关
         * @param  {number} input   输入类型
         * @param  {boolean} enable true 开启输入 false 关闭输入
         */
        public enableInput(input: number, enable: boolean): void {
            this.m_keyMap.get(input).keyEnable = enable;
        }
       
        /**
         * 输入总开关
         * @param  {boolean} enable true 开启输入 false 关闭输入
         */
        public set enable(enable: boolean) {
            let map: Dictionary<KeyData> = this.m_keyMap;
            let values: KeyData[] = map.values;
            for (let i: number = 0, iLen: number = values.length; i < iLen; i++) {
                values[i].keyEnable = enable;
            }
        }
    
        /**
         * 发送输入事件
         * @param  {number} input   输入类型
         * @param  {number} priority?   优先级
         */
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