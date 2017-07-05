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
        DateUtils.setServerTime = function (time) {
            this.s_clintTimestamp = Date.now();
            this.s_serverTimestamp = time;
        };
        /**毫秒*/
        DateUtils.getServerTimeMill = function () {
            return this.s_serverTimestamp + (Date.now() - this.s_clintTimestamp);
        };
        /**
         *
         * @param format  yyyy-MM-dd hh:mm:ss.S 或者 yyyy-M-d h:m:s.S
         */
        DateUtils.formatDate = function (format, date) {
            if (date == null) {
                date = DateUtils.s_date;
            }
            var o = {
                "M+": date.getUTCMonth() + 1,
                "d+": date.getUTCDate(),
                "h+": date.getUTCHours(),
                "m+": date.getUTCMinutes(),
                "s+": date.getUTCSeconds(),
                "q+": Math.floor((date.getUTCMonth() + 3) / 3),
                "S": date.getUTCMilliseconds() //毫秒   
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return format;
        };
        /**
         *  将毫秒数转换为 hh:mm:ss
         * @param milliseconds
         */
        DateUtils.format = function (milliseconds) {
            var count = milliseconds; //总毫秒数
            var ms = milliseconds % 1000;
            count = (count - ms) * 0.001; //总秒数
            var s = count % 60;
            count = (count - s) / 60; //总分钟数
            var m = count % 60;
            count = (count - m) / 60; //总小时数
            return (count < 0 ? 0 : count) + ":" + (m > 9 ? m : '0' + (m < 0 ? 0 : m)) + ":" + (s > 9 ? s : '0' + (s < 0 ? 0 : s));
        };
        return DateUtils;
    }());
    DateUtils.s_date = new Date();
    core.DateUtils = DateUtils;
    __reflect(DateUtils.prototype, "core.DateUtils");
})(core || (core = {}));
