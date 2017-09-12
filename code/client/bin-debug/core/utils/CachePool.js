var core;
(function (core) {
    var CachePool = /** @class */ (function () {
        function CachePool() {
        }
        /**
         * 添加对象
         */
        CachePool.addObj = function (name, obj) {
            var list = CachePool.s_pool[name];
            if (!list) {
                CachePool.s_pool[name] = [obj];
            }
            else {
                list.push(obj);
            }
        };
        /**
         * 获取对象
         */
        CachePool.getObj = function (name) {
            var list = CachePool.s_pool[name];
            if (list) {
                return list.pop();
            }
            return null;
        };
        /**
         * 清理指定缓存
         */
        CachePool.clear = function (name) {
            delete CachePool.s_pool[name];
        };
        /**
         * 清理所有缓存
         */
        CachePool.clearAll = function () {
            CachePool.s_pool = {};
        };
        CachePool.s_pool = {};
        return CachePool;
    }());
    core.CachePool = CachePool;
})(core || (core = {}));
//# sourceMappingURL=CachePool.js.map