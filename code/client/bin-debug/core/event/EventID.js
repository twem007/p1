var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var EventID = (function () {
        function EventID() {
        }
        EventID.MODULE_SHOW = 'core.EventID.MODULE_SHOW';
        EventID.MODULE_HIDE = 'core.EventID.MODULE_HIDE';
        EventID.SOCKET_CONNECT = 'core.EventID.SOCKET_CONNECT';
        EventID.SOCKET_DATA = 'core.EventID.SOCKET_DATA';
        EventID.SOCKET_IOERROR = 'core.EventID.SOCKET_IOERROR';
        EventID.SOCKET_CLOSE = 'core.EventID.SOCKET_CLOSE';
        EventID.KEYBOARD_DOWN = 'core.EventID.KEYBOARD_DOWN';
        EventID.KEYBOARD_UP = 'core.EventID.KEYBOARD_UP';
        return EventID;
    }());
    core.EventID = EventID;
    __reflect(EventID.prototype, "core.EventID");
})(core || (core = {}));
