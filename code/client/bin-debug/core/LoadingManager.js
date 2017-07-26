var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var LoadingManager = (function () {
        function LoadingManager() {
        }
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
        return LoadingManager;
    }());
    LoadingManager.s_loading = new Dictionary();
    core.LoadingManager = LoadingManager;
    __reflect(LoadingManager.prototype, "core.LoadingManager");
})(core || (core = {}));
//# sourceMappingURL=LoadingManager.js.map