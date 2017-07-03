var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var Callback = (function () {
        function Callback(callback, thisObj) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.callback = callback;
            this.thisObj = thisObj;
            this.args = args;
        }
        return Callback;
    }());
    core.Callback = Callback;
    __reflect(Callback.prototype, "core.Callback");
})(core || (core = {}));
//# sourceMappingURL=Callback.js.map