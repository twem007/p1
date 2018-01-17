class WSTest {
    constructor() {
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CONNECT, this.onSocketConnect, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CLOSE, this.onSocketClose, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_DATA, this.onSocketData, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_IOERROR, this.onSocketIOError, this);
        core.SocketAPI.instance.setType(core.WebSocketTypeEnum.TYPE_BINARY);
        core.SocketAPI.instance.setAddressURL('ws://192.168.17.246:8080');
        core.SocketAPI.instance.connect();
        let enums:any = core.ProtoFactory.createEnums('E_ErrorCode');
        egret.log(enums);
        let data:any = core.ProtoFactory.createData('G_Player');
        egret.log(data);
    }

    private onSocketConnect(data: core.SocketEventData): void {
        egret.log(data);
        let message: any = core.ProtoFactory.createMessage('GameLoginReq');
        message.token = '';
        message.open_id = '';
        let bytes: core.ByteBuffer = new core.ByteBuffer(message.toArrayBuffer());
        let buffer: core.ByteBuffer = new core.ByteBuffer();
        buffer.writeShort(bytes.length);
        buffer.writeBytes(bytes);
        core.SocketAPI.instance.sendData(buffer);
    }

    private onSocketClose(data: core.SocketEventData): void {
        egret.log(data);
    }

    private onSocketData(data: core.SocketEventData): void {
        egret.log(data);
        let bytes: core.ByteBuffer = new core.ByteBuffer();
        let buffer: core.ByteBuffer = data.messageData;
        let len:number = buffer.readShort();
        buffer.readBytes(bytes, 0, len);
        let info: any = core.ProtoFactory.decodeMessage('GameLoginResp', bytes.buffer);
        console.log(info);
    }

    private onSocketIOError(data: core.SocketEventData): void {
        egret.log(data);
    }
}