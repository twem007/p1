var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WSTest = (function () {
    function WSTest() {
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CONNECT, this.onSocketConnect, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CLOSE, this.onSocketClose, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_DATA, this.onSocketData, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_IOERROR, this.onSocketIOError, this);
        core.SocketAPI.instance.setAddressURL('ws://192.168.17.246:8080');
        core.SocketAPI.instance.connect();
    }
    WSTest.prototype.onSocketConnect = function (data) {
        egret.log(data);
    };
    WSTest.prototype.onSocketClose = function (data) {
        egret.log(data);
    };
    WSTest.prototype.onSocketData = function (data) {
        egret.log(data);
    };
    WSTest.prototype.onSocketIOError = function (data) {
        egret.log(data);
    };
    return WSTest;
}());
__reflect(WSTest.prototype, "WSTest");
//# sourceMappingURL=WSTest.js.map