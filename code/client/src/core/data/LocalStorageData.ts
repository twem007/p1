module core {
    export class LocalStorageData {

        private static hashID: string;

        public static setHashID(openid: string): void {
            LocalStorageData.hashID = openid;
            LocalStorageData.setItem('hashID', openid, true);
        }

        public static getHashID(): string {
            return LocalStorageData.getItem('hashID', true);
        }

        public static setItem(key: string, value: string, isGlobal: boolean = false): void {
            if (isGlobal) {
                egret.localStorage.setItem(key, value);
            } else {
                egret.localStorage.setItem(`${LocalStorageData.hashID}_${key}`, value);
            }
        }

        public static getItem(key: string, isGlobal: boolean = false): string {
            if (isGlobal) {
                return egret.localStorage.getItem(key);
            } else {
                return egret.localStorage.getItem(`${LocalStorageData.hashID}_${key}`);
            }
        }

        public static removeItem(key: string, isGlobal: boolean = false): void {
            if (isGlobal) {
                egret.localStorage.removeItem(key);
            } else {
                egret.localStorage.removeItem(`${LocalStorageData.hashID}_${key}`);
            }
        }

        public static clearAll(): void {
            egret.localStorage.clear();
        }
    }
}