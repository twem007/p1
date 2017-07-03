var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var HttpAPI = (function () {
    function HttpAPI() {
    }
    /**
     * HTTP GET
     * @param path          请求路径
     * @param param         参数列表
     * @param onComplete    请求成功回调
     * @param onIOError     请求失败回调
     * @param thisObj       this目标
     */
    HttpAPI.HttpGET = function (path, param, onComplete, onIOError, thisObj) {
        var url = param ? path + "?" + encodeURI(this.encode(param)) : path;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.addEventListener(egret.Event.COMPLETE, onComplete, thisObj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onIOError, thisObj);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    };
    /**
     * HTTP POST
     * @param path          请求路径
     * @param param         参数列表
     * @param onComplete    请求成功回调
     * @param onIOError     请求失败回调
     * @param thisObj       this目标
     */
    HttpAPI.HttpPOST = function (path, data, onComplete, onIOError, thisObj) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.addEventListener(egret.Event.COMPLETE, onComplete, thisObj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, onIOError, thisObj);
        request.open(path, egret.URLRequestMethod.POST);
        request.send(data);
    };
    HttpAPI.encode = function (data) {
        var paramURL = '';
        for (var key in data) {
            paramURL += key + "=" + data[key] + "&";
        }
        if (paramURL.length > 1) {
            return "" + paramURL.substring(0, paramURL.length - 1);
        }
        return paramURL;
    };
    return HttpAPI;
}());
__reflect(HttpAPI.prototype, "HttpAPI");
//# sourceMappingURL=HttpAPI.js.map