/**
 * HTTP通信的基础封装
 * 使用说明：
 * 1、http get请求将会将发送的参数进行url编码，并将参数附加在url请求链接以后，数据格式url?key1=value1&key2=value2
 * 2、http post将会以application/x-www-form-urlencoded方式，将数据发送至服务器
 */
class HttpAPI {
    public constructor() {
    }

    /**
     * HTTP GET
     * @param path          请求路径
     * @param param         参数列表
     * @param onComplete    请求成功回调
     * @param onIOError     请求失败回调
     * @param thisObj       this目标
     */
    public static HttpGET(path: string, param: any, onComplete: (event?: egret.Event) => void, onIOError: (event?: egret.IOErrorEvent) => void, thisObj: any): void {
        let url: string = param ? `${path}?${encodeURI(this.encode(param))}` : path;
        let request: egret.HttpRequest = new egret.HttpRequest();
        request.open(url, egret.HttpMethod.GET);
        request.responseType = egret.HttpResponseType.TEXT;
        request.addEventListener(egret.Event.COMPLETE, onComplete, thisObj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onIOError, thisObj);
        request.send();
    }

    /**
     * HTTP POST
     * @param path          请求路径
     * @param param         参数列表
     * @param onComplete    请求成功回调
     * @param onIOError     请求失败回调
     * @param thisObj       this目标
     */
    public static HttpPOST(path: string, data: any, onComplete: (event?: egret.Event) => void, onIOError: (event?: egret.IOErrorEvent) => void, thisObj: any): void {
        let request: egret.HttpRequest = new egret.HttpRequest();
        request.open(path, egret.URLRequestMethod.POST);
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.addEventListener(egret.Event.COMPLETE, onComplete, thisObj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onIOError, thisObj);
        request.send(data);
    }

    private static encode(data: any): string {
        let paramURL: string = '';
        for (let key in data) {
            paramURL += `${key}=${data[key]}&`
        }
        if (paramURL.length > 1) {
            return `${paramURL.substring(0, paramURL.length - 1)}`
        }
        return paramURL;
    }
}
