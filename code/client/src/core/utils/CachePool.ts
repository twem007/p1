module core {
    export class CachePool {
        private static pool: Object = {};
        /**
         * 添加对象
         */
        public static addObj(name: string, obj: any) {
            let list: any[] = CachePool.pool[name];
            if (!list) {
                CachePool.pool[name] = [obj];
            } else {
                list.push(obj);
            }
        }

        /**
         * 获取对象
         */
        public static getObj(name: string): any {
            let list: any[] = CachePool.pool[name];
            if (list) {
                return list.pop();
            }
            return null;
        }

        /**
         * 清理指定缓存
         */
        public static clear(name: string) {
            delete CachePool.pool[name];
        }

        /**
         * 清理所有缓存
         */
        public static clearAll() {
            CachePool.pool = {};
        }
    }
}
