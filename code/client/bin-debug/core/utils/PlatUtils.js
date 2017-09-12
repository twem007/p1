var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var PlatUtils = (function () {
        function PlatUtils() {
        }
        Object.defineProperty(PlatUtils, "isPC", {
            get: function () {
                return egret.Capabilities.os == 'Windows PC';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlatUtils, "isiOS", {
            get: function () {
                return egret.Capabilities.os == 'iOS';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlatUtils, "isAndroid", {
            get: function () {
                return egret.Capabilities.os == 'Android';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlatUtils, "isWindowPhone", {
            get: function () {
                return egret.Capabilities.os == 'Windows Phone';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlatUtils, "isMacOS", {
            get: function () {
                return egret.Capabilities.os == 'Mac OS';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlatUtils, "isUnknown", {
            get: function () {
                return egret.Capabilities.os == 'Unknown';
            },
            enumerable: true,
            configurable: true
        });
        return PlatUtils;
    }());
    core.PlatUtils = PlatUtils;
    __reflect(PlatUtils.prototype, "core.PlatUtils");
})(core || (core = {}));
//# sourceMappingURL=PlatUtils.js.map