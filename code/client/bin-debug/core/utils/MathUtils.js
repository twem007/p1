var core;
(function (core) {
    var MathUtils = /** @class */ (function () {
        function MathUtils() {
        }
        MathUtils.ceil = function (value) {
            if (value % 1 == 0) {
                return value;
            }
            if (value > 0) {
                return (value + 1) << 0;
            }
            else {
                return value << 0;
            }
        };
        /**
         * 得到 [min,max) 范围内的随机数
         */
        MathUtils.random = function (min, max) {
            return Math.random() * (max - min) + min << 0;
        };
        return MathUtils;
    }());
    core.MathUtils = MathUtils;
})(core || (core = {}));
//# sourceMappingURL=MathUtils.js.map