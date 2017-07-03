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
    /**
     *
     * @author
     *
     */
    var MessageData = (function (_super) {
        __extends(MessageData, _super);
        function MessageData(messageID, messageData) {
            if (messageData === void 0) { messageData = {}; }
            return _super.call(this, messageID, messageData) || this;
        }
        return MessageData;
    }(core.EventData));
    core.MessageData = MessageData;
    __reflect(MessageData.prototype, "core.MessageData");
})(core || (core = {}));
//# sourceMappingURL=MessageData.js.map