module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export class SocketAPI {
        private static s_instance: core.SocketAPI;

        private socket: egret.WebSocket;

        private sendBuffer: core.ByteBuffer;
        private receiveBuffer: core.ByteBuffer;

        private 

        public constructor() {
            let socket: egret.WebSocket = new egret.WebSocket();
            socket.type = egret.WebSocket.TYPE_BINARY;
            socket.addEventListener(egret.Event.CONNECT, this.onConnected, this);
            socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
            socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            socket.addEventListener(egret.Event.CLOSE, this.onClosed, this);
            this.socket = socket;
            this.sendBuffer = new core.ByteBuffer();
            this.receiveBuffer = new core.ByteBuffer();
        }

        public static getInstance(): core.SocketAPI {
            if (SocketAPI.s_instance == null) {
                SocketAPI.s_instance = new SocketAPI();
            }
            return SocketAPI.s_instance;
        }

        private onConnected(event: egret.Event): void {
            egret.log("与Socket服务器链接成功");
            core.EventCenter.getInstance().sendEvent(new EventData(EventID.SOCKET_CONNECT));
        }

        private onSocketData(event: egret.ProgressEvent): void {
            egret.log("从Socket服务器接收数据");
            let buffer: core.ByteBuffer = new core.ByteBuffer();
            this.socket.readBytes(buffer, buffer.length);
            this.readData(buffer);
        }

        private readData(buffer: core.ByteBuffer): void {
            buffer.position = 0;
            let size: number = buffer.readUnsignedShort();
            if (buffer.bytesAvailable >= size) {

            }else{
                this.receiveBuffer.writeBytes(buffer);
            }
        }

        private onIOError(event: egret.IOErrorEvent): void {
            Log("与Socket服务器链接失败");
            core.EventCenter.getInstance().sendEvent(new EventData(EventID.SOCKET_IOERROR));
        }

        private onClosed(event: egret.Event): void {
            Log("与Socket服务器断开链接");
            core.EventCenter.getInstance().sendEvent(new EventData(EventID.SOCKET_CLOSE));
        }

        private flushToServer(): void {
            Log("flush数据到Socket服务器");
            this.socket.writeBytes(this.sendBuffer);
            this.socket.flush();
            this.sendBuffer.clear();
        }

        public sendData(data: any): void {
            var buffer: egret.ByteArray = new core.ByteBuffer(data.toArrayBuffer());
            this.sendBuffer.writeByte(0x7c);
            this.sendBuffer.writeShort(buffer.length);
            this.sendBuffer.writeShort(data.protocol);
            this.sendBuffer.writeBytes(buffer);
            egret.callLater(this.flushToServer, this);
        }

        public connect(host: string, port: number): void {
            this.socket.connect(host, port);
        }

        public close(): void {
            this.socket.close();
        }
    }
}
