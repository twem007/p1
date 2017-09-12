var core;
(function (core) {
    var PlatUtils = /** @class */ (function () {
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
})(core || (core = {}));
//# sourceMappingURL=PlatUtils.js.map