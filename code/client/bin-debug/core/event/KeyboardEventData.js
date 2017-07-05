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
    var KeyboardEventData = (function (_super) {
        __extends(KeyboardEventData, _super);
        function KeyboardEventData(messageID, data) {
            return _super.call(this, messageID, data) || this;
        }
        KeyboardEventData.prototype.getData = function () {
            return this.messageData;
        };
        return KeyboardEventData;
    }(core.EventData));
    core.KeyboardEventData = KeyboardEventData;
    __reflect(KeyboardEventData.prototype, "core.KeyboardEventData");
})(core || (core = {}));
