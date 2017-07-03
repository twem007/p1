var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var EventID = (function () {
        function EventID() {
        }
        return EventID;
    }());
    EventID.MODULE_SHOW = 'core.Event.MODULE_SHOW';
    EventID.MODULE_HIDE = 'core.Event.MODULE_HIDE';
    EventID.SOCKET_CONNECT = 'core.Event.SOCKET_CONNECT';
    EventID.SOCKET_DATA = 'core.Event.SOCKET_DATA';
    EventID.SOCKET_IOERROR = 'core.Event.SOCKET_IOERROR';
    EventID.SOCKET_CLOSE = 'core.Event.SOCKET_CLOSE';
    core.EventID = EventID;
    __reflect(EventID.prototype, "core.EventID");
})(core || (core = {}));
//# sourceMappingURL=EventID.js.map