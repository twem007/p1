var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *
     * @author yuxuefeng
     *
     */
    var SocketAPI = (function () {
        function SocketAPI() {
            var socket = new egret.WebSocket();
            socket.type = egret.WebSocket.TYPE_BINARY;
            socket.addEventListener(egret.Event.CONNECT, this.onConnected, this);
            socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
            socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            socket.addEventListener(egret.Event.CLOSE, this.onClosed, this);
            this.m_socket = socket;
            this.m_sendBuffer = new core.ByteBuffer();
            this.m_receiveBuffer = new core.ByteBuffer();
        }
        SocketAPI.getInstance = function () {
            if (SocketAPI.s_instance == null) {
                SocketAPI.s_instance = new SocketAPI();
            }
            return SocketAPI.s_instance;
        };
        SocketAPI.prototype.onConnected = function (event) {
            egret.log("与Socket服务器链接成功");
            core.EventCenter.getInstance().sendEvent(new core.EventData(core.EventID.SOCKET_CONNECT));
        };
        SocketAPI.prototype.onSocketData = function (event) {
            egret.log("从Socket服务器接收数据");
            var buffer = new core.ByteBuffer();
            this.m_socket.readBytes(buffer, buffer.length);
            this.readData(buffer);
        };
        SocketAPI.prototype.readData = function (buffer) {
            buffer.position = 0;
            var size = buffer.readUnsignedShort();
            if (buffer.bytesAvailable >= size) {
            }
            else {
                this.m_receiveBuffer.writeBytes(buffer);
            }
        };
        SocketAPI.prototype.onIOError = function (event) {
            Log("与Socket服务器链接失败");
            core.EventCenter.getInstance().sendEvent(new core.EventData(core.EventID.SOCKET_IOERROR));
        };
        SocketAPI.prototype.onClosed = function (event) {
            Log("与Socket服务器断开链接");
            core.EventCenter.getInstance().sendEvent(new core.EventData(core.EventID.SOCKET_CLOSE));
        };
        SocketAPI.prototype.flushToServer = function () {
            Log("flush数据到Socket服务器");
            this.m_socket.writeBytes(this.m_sendBuffer);
            this.m_socket.flush();
            this.m_sendBuffer.clear();
        };
        SocketAPI.prototype.sendData = function (data) {
            var buffer = new core.ByteBuffer(data.toArrayBuffer());
            this.m_sendBuffer.writeByte(0x7c);
            this.m_sendBuffer.writeShort(buffer.length);
            this.m_sendBuffer.writeShort(data.protocol);
            this.m_sendBuffer.writeBytes(buffer);
            egret.callLater(this.flushToServer, this);
        };
        SocketAPI.prototype.connect = function (host, port) {
            this.m_socket.connect(host, port);
        };
        SocketAPI.prototype.close = function () {
            this.m_socket.close();
        };
        return SocketAPI;
    }());
    core.SocketAPI = SocketAPI;
    __reflect(SocketAPI.prototype, "core.SocketAPI");
})(core || (core = {}));
