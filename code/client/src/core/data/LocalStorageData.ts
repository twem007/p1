module core {
    /**
     * LocalStorage扩展类
     * 本类定位是解决LocalStorage的使用过程中分别保存全局数据和帐号绑定数据分开保存的问题
     * 使用说明：
     * 1、在游戏初始化完成并获取到帐号数据以后，应首先调用setHashID将帐号或者openid初始化
     * 2、如需保存为全局数据并多帐号通用的需要在在调用setItem时将isGlobal设置为true
     * 3、如需保存为帐号绑定数据则在setItem时将isGlobal设置为false或者忽略该参数。
     */
    export class LocalStorageData {

        private static hashID: string;
        /**
         * 设置openid或者帐号id
         * @param  {string} openid
         */
        public static setHashID(openid: string): void {
            LocalStorageData.hashID = openid;
            LocalStorageData.setItem('hashID', openid, true);
        }
        /**
         * 返回openid或者帐号id
         * @return string
         */
        public static getHashID(): string {
            return LocalStorageData.getItem('hashID', true);
        }
        
        /**
         * 保存数据
         * @param  {string} key 数据key
         * @param  {string} value   数据
         * @param  {boolean=false} isGlobal 是否全局保存
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
         * @param  {string} key 数据key
         * @param  {boolean=false} isGlobal 是否全局保存
         * @return string   数据
         */
        public static getItem(key: string, isGlobal: boolean = false): string {
            if (isGlobal) {
                return egret.localStorage.getItem(key);
            } else {
                return egret.localStorage.getItem(`${LocalStorageData.hashID}_${key}`);
            }
        }
        /**
         * 删除保存数据
         * @param  {string} key 数据key
         * @param  {boolean=false} isGlobal 是否全局保存
         */
        public static removeItem(key: string, isGlobal: boolean = false): void {
            if (isGlobal) {
                egret.localStorage.removeItem(key);
            } else {
                egret.localStorage.removeItem(`${LocalStorageData.hashID}_${key}`);
            }
        }
        /**
         * 清空所有数据
         */
        public static clearAll(): void {
            egret.localStorage.clear();
        }
    }
}