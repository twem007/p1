var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *
     * @author
     *
     */
    var DebugUtils = (function () {
        function DebugUtils() {
        }
        /**
         * 开始时间戳
         */
        DebugUtils.begin = function (tag) {
            DebugUtils.s_dic[tag] = Date.now();
        };
        /**
         * 结束时间戳
         */
        DebugUtils.finish = function (tag) {
            return Date.now() - DebugUtils.s_dic[tag];
        };
        return DebugUtils;
    }());
    DebugUtils.s_dic = new Dictionary();
    core.DebugUtils = DebugUtils;
    __reflect(DebugUtils.prototype, "core.DebugUtils");
})(core || (core = {}));
function Log(message, isLocal) {
    if (isLocal === void 0) { isLocal = false; }
    egret.log(message);
}
