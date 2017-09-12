var core;
(function (core) {
    var EventID = /** @class */ (function () {
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
})(core || (core = {}));
//# sourceMappingURL=EventID.js.map