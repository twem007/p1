var core;
(function (core) {
    /**
     *
     * @author
     *
     */
    var DebugUtils = /** @class */ (function () {
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
        DebugUtils.s_dic = new Dictionary();
        return DebugUtils;
    }());
    core.DebugUtils = DebugUtils;
})(core || (core = {}));
//# sourceMappingURL=DebugUtils.js.map