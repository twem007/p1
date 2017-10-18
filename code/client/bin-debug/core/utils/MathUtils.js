var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var MathUtils = (function () {
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
    __reflect(MathUtils.prototype, "core.MathUtils");
})(core || (core = {}));
