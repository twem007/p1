var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TimerUtils = (function () {
    function TimerUtils() {
    }
    TimerUtils.calcuNetDelayEnd = function () {
        TimerUtils._mNetDelay = egret.getTimer() - TimerUtils._mSendTime;
    };
    TimerUtils.calcuNetDelayStart = function () {
        TimerUtils._mSendTime = egret.getTimer();
    };
    /**
     * 获取服务器时间
     */
    TimerUtils.getServerTime = function () {
        return Math.floor(TimerUtils.getServerTimeMill() * 0.001);
    };
    TimerUtils.setServerTime = function (time) {
        this._mServerTime = time;
        this.ServerTimeStamp = egret.getTimer();
    };
    /**毫秒*/
    TimerUtils.getServerTimeMill = function () {
        return this._mServerTime + (egret.getTimer() - this.ServerTimeStamp);
    };
    /**当前网络延迟*/
    TimerUtils.getNetDelay = function () {
        return TimerUtils._mNetDelay;
    };
    /**
     * 获取服务器时间的Ymd格式
     */
    TimerUtils.getServerTimeYmd = function () {
        return Number(TimerUtils.dateFormat("yyyyMMdd", TimerUtils.getServerTime()));
    };
    //格式化日期
    TimerUtils.dateFormat = function (fmt, time) {
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
    /**把秒数转成时分秒 */
    TimerUtils.timeStamp = function (second_time) {
        var minStr = "";
        var secondStr = "";
        var time = "0:00:" + parseInt(second_time) + "";
        if (parseInt(second_time) < 10) {
            time = "0:00:0" + parseInt(second_time) + "";
        }
        if (parseInt(second_time) > 60) {
            var second = parseInt(second_time) % 60;
            var secondTime = parseInt(second_time);
            var min = Math.floor(secondTime / 60);
            minStr = min + "";
            secondStr = second + "";
            if (min < 10) {
                minStr = "0" + min;
            }
            if (second < 10) {
                secondStr = "0" + second;
            }
            time = "0:" + minStr + ":" + secondStr;
            if (min > 60) {
                min = Math.floor((secondTime / 60) % 60);
                var hour = Math.floor((secondTime / 60) / 60);
                minStr = min + "";
                secondStr = second + "";
                if (min < 10) {
                    minStr = "0" + min;
                }
                if (second < 10) {
                    secondStr = "0" + second;
                }
                time = hour + ":" + minStr + ":" + secondStr;
            }
        }
        return time;
    };
    /**把秒数转成(分钟：秒数)格式 */
    TimerUtils.timeToString = function (timeNum) {
        var timeMinute = parseInt("" + timeNum / 60 + "");
        var timeText;
        if (timeMinute < 1) {
            timeMinute = 0;
        }
        if (timeMinute == 0) {
            timeText = "" + (timeNum % 60) + "";
        }
        else {
            if (timeNum % 60 < 10) {
                timeText = "" + timeMinute + ":0" + (timeNum % 60) + "";
            }
            else {
                timeText = "" + timeMinute + ":" + (timeNum % 60) + "";
            }
        }
        return timeText;
    };
    /**单转分钟 */
    TimerUtils.timeMinuteToString = function (timeNum) {
        var timeMinute = parseInt("" + timeNum / 60 + "");
        var timeText;
        timeText = "" + timeMinute + "";
        return timeText;
    };
    /**单转秒数 */
    TimerUtils.timeSecondsToString = function (timeNum) {
        var timeMinute = parseInt("" + timeNum % 60 + "");
        var timeText;
        if (timeMinute < 10) {
            timeText = "0" + timeMinute + "";
        }
        else {
            timeText = "" + timeMinute + "";
        }
        return timeText;
    };
    return TimerUtils;
}());
TimerUtils._mServerTime = 0; //通过服务器协议返回的时间
TimerUtils.ServerTimeStamp = 0; //时间标尺
/**记录网络延迟,读取请用 TimerUtils.getNetDelay()*/
TimerUtils._mNetDelay = 10; // 网络延迟
TimerUtils._mSendTime = 0;
__reflect(TimerUtils.prototype, "TimerUtils");
//# sourceMappingURL=TimerUtils.js.map