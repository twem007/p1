/**
 *
 * @author 
 *
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
        request.responseType = egret.HttpResponseType.TEXT;
        request.addEventListener(egret.Event.COMPLETE, onComplete, thisObj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onIOError, thisObj);
        request.open(url, egret.HttpMethod.GET);
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
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.addEventListener(egret.Event.COMPLETE, onComplete, thisObj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onIOError, thisObj);
        request.open(path, egret.URLRequestMethod.POST);
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
