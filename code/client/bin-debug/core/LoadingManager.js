var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var LoadingManager = (function () {
        function LoadingManager() {
        }
        /**
         * 获取Loading实例
         */
        LoadingManager.getLoading = function (ref) {
            var loading = LoadingManager.s_loading.get(ref);
            if (!loading) {
                if (ref) {
                    loading = new ref();
                    LoadingManager.s_loading.add(ref, loading);
                }
            }
            return loading;
        };
        /**
         * 得到当前Loading组件
         */
        LoadingManager.getCurLoading = function () {
            return LoadingManager.s_curLoading;
        };
        /**
         * 设置当前Loading组件
         */
        LoadingManager.setCurLoading = function (ref) {
            var loading = LoadingManager.s_loading.get(ref);
            if (!loading) {
                if (ref) {
                    loading = new ref();
                    LoadingManager.s_loading.add(ref, loading);
                }
            }
            LoadingManager.s_curLoading = loading;
            return loading;
        };
        LoadingManager.s_loading = new Dictionary();
        return LoadingManager;
    }());
    core.LoadingManager = LoadingManager;
    __reflect(LoadingManager.prototype, "core.LoadingManager");
})(core || (core = {}));
