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
    var DateUtils = (function () {
        function DateUtils() {
        }
        /**
         * 开始计算网络延迟
         */
        DateUtils.calcuNetDelayStart = function () {
            DateUtils.s_sendTimestamp = egret.getTimer();
        };
        /**
         * 结束计算网络延迟
         */
        DateUtils.calcuNetDelayEnd = function () {
            DateUtils.s_delay = egret.getTimer() - DateUtils.s_sendTimestamp;
        };
        /**
         * 获取服务器时间
         */
        DateUtils.getServerTime = function () {
            return Math.floor(DateUtils.getServerTimeMill() * 0.001);
        };
        DateUtils.setServerTime = function (time) {
            this.s_serverTimestamp = time;
            this.s_clientTimestamp = egret.getTimer();
        };
        /**毫秒*/
        DateUtils.getServerTimeMill = function () {
            return this.s_serverTimestamp + (egret.getTimer() - this.s_clientTimestamp);
        };
        /**当前网络延迟*/
        DateUtils.getNetDelay = function () {
            return DateUtils.s_delay;
        };
        /**
         * 获取服务器时间的Ymd格式
         */
        DateUtils.getServerTimeYmd = function () {
            return Number(DateUtils.dateFormat("yyyyMMdd", DateUtils.getServerTime()));
        };
        //格式化日期
        DateUtils.dateFormat = function (fmt, time) {
            var date = new Date(time * 1000);
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        DateUtils.s_serverTimestamp = 0; //服务器同步时间戳
        DateUtils.s_clientTimestamp = 0; //客户端同步时间戳
        DateUtils.s_delay = 10; // 网络延迟
        DateUtils.s_sendTimestamp = 0;
        return DateUtils;
    }());
    core.DateUtils = DateUtils;
    __reflect(DateUtils.prototype, "core.DateUtils");
})(core || (core = {}));
//# sourceMappingURL=DateUtils.js.map