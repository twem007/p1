var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WSTest = (function () {
    function WSTest() {
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CONNECT, this.onSocketConnect, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CLOSE, this.onSocketClose, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_DATA, this.onSocketData, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_IOERROR, this.onSocketIOError, this);
        core.SocketAPI.instance.setType(core.WebSocketTypeEnum.TYPE_BINARY);
        core.SocketAPI.instance.setAddressURL('ws://192.168.17.246:8080');
        core.SocketAPI.instance.connect();
        var enums = core.ProtoFactory.createEnums('E_ErrorCode');
        egret.log(enums);
        var data = core.ProtoFactory.createData('G_Player');
        egret.log(data);
    }
    WSTest.prototype.onSocketConnect = function (data) {
        egret.log(data);
        var message = core.ProtoFactory.createMessage('GameLoginReq');
        message.token = '';
        message.open_id = '';
        var bytes = new core.ByteBuffer(message.toArrayBuffer());
        var buffer = new core.ByteBuffer();
        buffer.writeShort(bytes.length);
        buffer.writeBytes(bytes);
        core.SocketAPI.instance.sendData(buffer);
    };
    WSTest.prototype.onSocketClose = function (data) {
        egret.log(data);
    };
    WSTest.prototype.onSocketData = function (data) {
        egret.log(data);
        var bytes = new core.ByteBuffer();
        var buffer = data.messageData;
        var len = buffer.readShort();
        buffer.readBytes(bytes, 0, len);
        var info = core.ProtoFactory.decodeMessage('GameLoginResp', bytes.buffer);
        console.log(info);
    };
    WSTest.prototype.onSocketIOError = function (data) {
        egret.log(data);
    };
    return WSTest;
}());
__reflect(WSTest.prototype, "WSTest");
