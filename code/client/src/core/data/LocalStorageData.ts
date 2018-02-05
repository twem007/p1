module core {
    export class LocalStorageData {

        private static hashID: string;
        /**
         * @param hashID 设置数据唯一ID，用于数据隔离
         */
        public static setHashID(hashID: string): void {
            LocalStorageData.hashID = hashID;
        }
        /**
         * @param key       数据KEY
         * @param value     数据值
         * @param isGlobal  是否全局数据(全局数据KEY唯一，非全局数据每个hashID分别保存KEY)
         */
        public static setItem(key: string, value: string, isGlobal: boolean = false): void {
            if (isGlobal) {
                egret.localStorage.setItem(key, value);
            } else {
                egret.localStorage.setItem(`${LocalStorageData.hashID}_${key}`, value);
            }
        }
        /**
         * 获取数据
         * @param key       数据KEY
         * @param isGlobal  是否全局数据(全局数据KEY唯一，非全局数据每个hashID分别保存KEY)
         */
        public static getItem(key: string, isGlobal: boolean = false): string {
            if (isGlobal) {
                return egret.localStorage.getItem(key);
            } else {
                return egret.localStorage.getItem(`${LocalStorageData.hashID}_${key}`);
            }
        }
        /**
         * 删除数据
         * @param key       数据KEY
         * @param isGlobal  是否全局数据(全局数据KEY唯一，非全局数据每个hashID分别保存KEY)
         */
        public static removeItem(key: string, isGlobal: boolean = false): void {
            if (isGlobal) {
                egret.localStorage.removeItem(key);
            } else {
                egret.localStorage.removeItem(`${LocalStorageData.hashID}_${key}`);
            }
        }
        /**
         * 清空数据
         */
        public static clearAll(): void {
            egret.localStorage.clear();
        }
    }
}