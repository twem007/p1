var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var CachePool = (function () {
        function CachePool() {
        }
        /**
         * 添加对象
         */
        CachePool.addObj = function (name, obj) {
            var list = CachePool.pool[name];
            if (!list) {
                CachePool.pool[name] = [obj];
            }
            else {
                list.push(obj);
            }
        };
        /**
         * 获取对象
         */
        CachePool.getObj = function (name) {
            var list = CachePool.pool[name];
            if (list) {
                return list.pop();
            }
            return null;
        };
        /**
         * 清理指定缓存
         */
        CachePool.clear = function (name) {
            delete CachePool.pool[name];
        };
        /**
         * 清理所有缓存
         */
        CachePool.clearAll = function () {
            CachePool.pool = {};
        };
        return CachePool;
    }());
    CachePool.pool = {};
    core.CachePool = CachePool;
    __reflect(CachePool.prototype, "core.CachePool");
})(core || (core = {}));
//# sourceMappingURL=CachePool.js.map