module core {
    /**
     * 对象池
     * 本类为对象池管理类，不包含对象的创建功能，请处理获取数据为null的情况。
     */
    export class CachePool {

        private static s_pool: Dictionary<any[]> = new Dictionary<any[]>();

        /**
         * 添加对象到对象池
         * @param  {string} name    对象key
         * @param  {any} obj        对象实例
         */
        public static addObj(name: string, obj: any) {
            if (!name || !obj) {
                return;
            }
            let list: any[] = CachePool.getObj(name);
            if (!list) {
                CachePool.s_pool.add(name, [obj]);
            } else {
                list.push(obj);
            }
        }

        /**
         * 获取对象
         */
        public static getObj(name: string): any {
            let list: any[] = CachePool.s_pool.get(name);
            if (list) {
                return list.pop();
            }
            return null;
        }

        /**
         * 清理指定缓存
         */
        public static clear(name: string) {
            CachePool.s_pool.remove(name);
        }

        /**
         * 清理所有缓存
         */
        public static clearAll(): void {
            CachePool.s_pool.clear();
        }
    }
}
