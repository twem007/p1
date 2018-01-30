class WSTest {
    constructor() {
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CONNECT, this.onSocketConnect, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CLOSE, this.onSocketClose, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_DATA, this.onSocketData, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_IOERROR, this.onSocketIOError, this);
        core.SocketAPI.instance.setType(core.WebSocketTypeEnum.TYPE_BINARY);
        core.SocketAPI.instance.setAddressURL('ws://192.168.17.246:8080');
        core.SocketAPI.instance.connect();
    }

    private onSocketConnect(data: core.SocketEventData): void {
        egret.log(data);
        let message: game.GameLoginReq = new game.GameLoginReq();
        message.token = '';
        message.openId = '';
        let bytes: core.ByteBuffer = new core.ByteBuffer(game.GameLoginReq.encode(message).finish());
        core.SocketAPI.instance.sendData(bytes);
    }

    private onSocketClose(data: core.SocketEventData): void {
        egret.log(data);
    }

    private onSocketData(data: core.SocketEventData): void {
        egret.log(data);
        let info: any = game.GameLoginReq.decode(data.messageData);
        console.log(info);
    }

    private onSocketIOError(data: core.SocketEventData): void {
        egret.log(data);
    }
}