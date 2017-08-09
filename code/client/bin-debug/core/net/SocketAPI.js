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
            /**
             * WebSocket连接状态
             */
            this.m_state = WebSocketStateEnum.CLOSED;
            /**
             * WebSocket发送和接收数据类型
             */
            this.m_type = WebSocketTypeEnum.TYPE_STRING;
            var webSocket = new egret.WebSocket();
            webSocket.addEventListener(egret.Event.CONNECT, this.onConnected, this);
            webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
            webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            webSocket.addEventListener(egret.Event.CLOSE, this.onClosed, this);
            this.m_webSocket = webSocket;
        }
        Object.defineProperty(SocketAPI, "instance", {
            get: function () {
                if (SocketAPI.s_instance == null) {
                    SocketAPI.s_instance = new SocketAPI();
                }
                return SocketAPI.s_instance;
            },
            enumerable: true,
            configurable: true
        });
        SocketAPI.prototype.onConnected = function (event) {
            egret.log("与WebSocket服务器链接成功");
            this.m_state = WebSocketStateEnum.CONNECTED;
            core.EventCenter.getInstance().sendEvent(new core.SocketEventData(core.EventID.SOCKET_CONNECT));
        };
        SocketAPI.prototype.onSocketData = function (event) {
            var buffer = new core.ByteBuffer();
            this.m_webSocket.readBytes(buffer, buffer.length);
            core.EventCenter.getInstance().sendEvent(new core.SocketEventData(core.EventID.SOCKET_DATA, buffer));
        };
        SocketAPI.prototype.onIOError = function (event) {
            egret.log("与WebSocket服务器链接失败");
            this.m_state = WebSocketStateEnum.CLOSED;
            core.EventCenter.getInstance().sendEvent(new core.SocketEventData(core.EventID.SOCKET_IOERROR));
        };
        SocketAPI.prototype.onClosed = function (event) {
            egret.log("与WebSocket服务器断开链接");
            this.m_state = WebSocketStateEnum.CLOSED;
            core.EventCenter.getInstance().sendEvent(new core.SocketEventData(core.EventID.SOCKET_CLOSE));
        };
        SocketAPI.prototype.sendData = function (data) {
            this.m_webSocket.writeBytes(data);
            this.m_webSocket.flush();
        };
        SocketAPI.prototype.setAddress = function (host, port) {
            this.m_host = host;
            this.m_port = port;
        };
        SocketAPI.prototype.setAddressURL = function (hostURL) {
            this.m_host = hostURL;
        };
        SocketAPI.prototype.setType = function (type) {
            switch (type) {
                case WebSocketTypeEnum.TYPE_STRING:
                    this.m_webSocket.type = egret.WebSocket.TYPE_STRING;
                    break;
                case WebSocketTypeEnum.TYPE_BINARY:
                    this.m_webSocket.type = egret.WebSocket.TYPE_BINARY;
                    break;
            }
        };
        SocketAPI.prototype.connect = function () {
            this.m_state = WebSocketStateEnum.CONNECTING;
            if (this.m_host.indexOf(":") > 0) {
                this.m_webSocket.connectByUrl(this.m_host);
            }
            else {
                this.m_webSocket.connect(this.m_host, this.m_port);
            }
        };
        SocketAPI.prototype.close = function () {
            this.m_state = WebSocketStateEnum.CLOSING;
            this.m_webSocket.close();
        };
        return SocketAPI;
    }());
    core.SocketAPI = SocketAPI;
    __reflect(SocketAPI.prototype, "core.SocketAPI");
    /**
     * CONNECTING   正在尝试连接服务器
     * CONNECTED    已成功连接服务器
     * CLOSING      正在断开服务器连接
     * CLOSED       已断开与服务器连接
     */
    var WebSocketStateEnum;
    (function (WebSocketStateEnum) {
        WebSocketStateEnum[WebSocketStateEnum["CONNECTING"] = 0] = "CONNECTING";
        WebSocketStateEnum[WebSocketStateEnum["CONNECTED"] = 1] = "CONNECTED";
        WebSocketStateEnum[WebSocketStateEnum["CLOSING"] = 2] = "CLOSING";
        WebSocketStateEnum[WebSocketStateEnum["CLOSED"] = 3] = "CLOSED";
    })(WebSocketStateEnum = core.WebSocketStateEnum || (core.WebSocketStateEnum = {}));
    /**
     * TYPE_STRING 以字符串格式发送和接收数据
     * TYPE_BINARY 以二进制格式发送和接收数据
     */
    var WebSocketTypeEnum;
    (function (WebSocketTypeEnum) {
        WebSocketTypeEnum[WebSocketTypeEnum["TYPE_STRING"] = 0] = "TYPE_STRING";
        WebSocketTypeEnum[WebSocketTypeEnum["TYPE_BINARY"] = 1] = "TYPE_BINARY";
    })(WebSocketTypeEnum = core.WebSocketTypeEnum || (core.WebSocketTypeEnum = {}));
})(core || (core = {}));
//# sourceMappingURL=SocketAPI.js.map