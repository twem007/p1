module core {
    export class CachePool {
        private static s_pool: Object = {};
        /**
         * 添加对象
         */
        public static addObj(name: string, obj: any) {
            if (!name || !obj) {
                return;
            }
            let list: any[] = CachePool.s_pool[name];
            if (!list) {
                CachePool.s_pool[name] = [obj];
            } else {
                list.push(obj);
            }
        }

        /**
         * 获取对象
         */
        public static getObj(name: string): any {
            let list: any[] = CachePool.s_pool[name];
            if (list) {
                return list.pop();
            }
            return null;
        }

        /**
         * 清理指定缓存
         */
        public static clear(name: string) {
            delete CachePool.s_pool[name];
        }

        /**
         * 清理所有缓存
         */
        public static clearAll() {
            CachePool.s_pool = {};
        }
    }
}
