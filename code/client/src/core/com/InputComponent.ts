module core {
    export abstract class InputComponent implements IComponent {

        private m_keyMap: Dictionary<KeyData>;

        constructor() {
            this.m_keyMap = new Dictionary<KeyData>();
        }

        public init():void{
            this.addListener();
        }

        public release():void{
            this.removeListener();
        }

        abstract addListener(): void;

        abstract removeListener(): void;

        public mapKey(code: number, key: string): void {
            let data: KeyData = new KeyData();
            data.keyCode = code;
            data.key = key;
            data.keyEnable = true;
            this.m_keyMap.add(code, data);
        }

        public enableKey(key: string, enable: boolean): void {
            this.m_keyMap.get(key).keyEnable = enable;
        }
    }

    class KeyData {

        public keyCode: number;

        public key: string;

        public keyEnable: boolean;

        constructor() {

        }
    }
}