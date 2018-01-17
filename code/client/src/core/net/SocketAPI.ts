module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export class SocketAPI {

        private static s_instance: SocketAPI;

        private m_webSocket: egret.WebSocket;
        /**
         * 目标服务器地址
         */
        private m_address: string;
        /**
         * WebSocket连接状态
         */
        private m_state: WebSocketStateEnum = WebSocketStateEnum.CLOSED;
        /**
         * WebSocket发送和接收数据类型
         */
        private m_type: WebSocketTypeEnum = WebSocketTypeEnum.TYPE_STRING;

        public constructor() {
            let webSocket: egret.WebSocket = new egret.WebSocket();
            webSocket.addEventListener(egret.Event.CONNECT, this.onConnected, this);
            webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
            webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            webSocket.addEventListener(egret.Event.CLOSE, this.onClosed, this);
            this.m_webSocket = webSocket;
        }

        public static get instance(): SocketAPI {
            if (SocketAPI.s_instance == null) {
                SocketAPI.s_instance = new SocketAPI();
            }
            return SocketAPI.s_instance;
        }

        private onConnected(event: egret.Event): void {
            egret.log("与WebSocket服务器链接成功");
            this.m_state = WebSocketStateEnum.CONNECTED;
            core.EventCenter.getInstance().sendEvent(new SocketEventData(EventID.SOCKET_CONNECT));
        }

        private onSocketData(event: egret.ProgressEvent): void {
            let buffer: core.ByteBuffer = new core.ByteBuffer();
            this.m_webSocket.readBytes(buffer, buffer.length);
            core.EventCenter.getInstance().sendEvent(new SocketEventData(EventID.SOCKET_DATA, buffer));
        }

        private onIOError(event: egret.IOErrorEvent): void {
            egret.log("与WebSocket服务器链接失败");
            this.m_state = WebSocketStateEnum.CLOSED;
            core.EventCenter.getInstance().sendEvent(new SocketEventData(EventID.SOCKET_IOERROR));
        }

        private onClosed(event: egret.Event): void {
            egret.log("与WebSocket服务器断开链接");
            this.m_state = WebSocketStateEnum.CLOSED;
            core.EventCenter.getInstance().sendEvent(new SocketEventData(EventID.SOCKET_CLOSE));
        }

        public sendData(data: egret.ByteArray): void {
            this.m_webSocket.writeBytes(data);
            egret.callLater(this.flushToServer, this);
        }

        private flushToServer(): void {
            this.m_webSocket.flush();
        }
        /**
         * @param host 服务器IP 如：127.0.0.1
         * @param port 服务器端口 如：8080
         * @param isSSL 是否应用SSL
         */
        public setAddress(host: string, port: number, isSSL: boolean = false): void {
            this.m_address = `${isSSL ? 'wss' : 'ws'}://${host}:${port}`;
        }
        /**
         * @param address 服务器地址 如：ws://127.0.0.1:8080 或 wss://127.0.0.1:8080
         */
        public setAddressURL(address: string): void {
            this.m_address = address;
        }

        public setType(type: WebSocketTypeEnum): void {
            switch (type) {
                case WebSocketTypeEnum.TYPE_STRING:
                    this.m_webSocket.type = egret.WebSocket.TYPE_STRING;
                    break;
                case WebSocketTypeEnum.TYPE_BINARY:
                    this.m_webSocket.type = egret.WebSocket.TYPE_BINARY;
                    break;
            }
        }

        public connect(): void {
            this.m_state = WebSocketStateEnum.CONNECTING;
            this.m_webSocket.connectByUrl(this.m_address);
        }

        public close(): void {
            this.m_state = WebSocketStateEnum.CLOSING;
            this.m_webSocket.close();
        }
    }

    /**
     * CONNECTING   正在尝试连接服务器
     * CONNECTED    已成功连接服务器 
     * CLOSING      正在断开服务器连接
     * CLOSED       已断开与服务器连接
     */
    export enum WebSocketStateEnum {
        CONNECTING,
        CONNECTED,
        CLOSING,
        CLOSED
    }

    /**
     * TYPE_STRING 以字符串格式发送和接收数据
     * TYPE_BINARY 以二进制格式发送和接收数据
     */
    export enum WebSocketTypeEnum {
        TYPE_STRING,
        TYPE_BINARY
    }
}
