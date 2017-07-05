var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core;
(function (core) {
    var ModuleEventData = (function (_super) {
        __extends(ModuleEventData, _super);
        function ModuleEventData(messageID, moduleEnum, preModule, data) {
            var _this = _super.call(this, messageID, data) || this;
            _this.moduleEnum = moduleEnum;
            _this.preModule = preModule;
            return _this;
        }
        return ModuleEventData;
    }(core.EventData));
    core.ModuleEventData = ModuleEventData;
    __reflect(ModuleEventData.prototype, "core.ModuleEventData");
})(core || (core = {}));
