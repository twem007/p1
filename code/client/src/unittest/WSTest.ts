class WSTest {
    constructor() {
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CONNECT, this.onSocketConnect, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_CLOSE, this.onSocketClose, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_DATA, this.onSocketData, this);
        core.EventCenter.getInstance().addEventListener(core.EventID.SOCKET_IOERROR, this.onSocketIOError, this);
        core.SocketAPI.instance.setAddressURL('ws://192.168.17.246:8080');
        core.SocketAPI.instance.connect();
    }

    private onSocketConnect(data: core.SocketEventData): void {
        egret.log(data);
    }

    private onSocketClose(data: core.SocketEventData): void {
        egret.log(data);
    }

    private onSocketData(data: core.SocketEventData): void {
        egret.log(data);
    }

    private onSocketIOError(data: core.SocketEventData): void {
        egret.log(data);
    }
}