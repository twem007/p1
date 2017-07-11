class TimerUtils {
    private static _mServerTime = 0;       //通过服务器协议返回的时间
    private static ServerTimeStamp = 0;  //时间标尺

    /**记录网络延迟,读取请用 TimerUtils.getNetDelay()*/
    private static _mNetDelay: number = 10;// 网络延迟
    public static calcuNetDelayEnd(): void {//结束计算
        TimerUtils._mNetDelay = egret.getTimer() - TimerUtils._mSendTime;
    }
    private static _mSendTime: number = 0;
    public static calcuNetDelayStart() {//开始计算
        TimerUtils._mSendTime = egret.getTimer();
    }
    /**
     * 获取服务器时间
     */
    public static getServerTime(): number {
        return Math.floor(TimerUtils.getServerTimeMill() * 0.001);
    }
    public static setServerTime(time: number) {
        this._mServerTime = time;
        this.ServerTimeStamp = egret.getTimer();
    }
    /**毫秒*/
    public static getServerTimeMill(): number {
        return this._mServerTime + (egret.getTimer() - this.ServerTimeStamp);
    }
    /**当前网络延迟*/
    public static getNetDelay() {
        return TimerUtils._mNetDelay;
    }
    /**
     * 获取服务器时间的Ymd格式
     */
    public static getServerTimeYmd(): number {
        return Number(TimerUtils.dateFormat("yyyyMMdd", TimerUtils.getServerTime()));
    }

    //格式化日期
    public static dateFormat(fmt: string, time: number) {
        var date = new Date(time * 1000);
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    /**把秒数转成时分秒 */
    public static timeStamp(second_time: string) {
        let minStr: string = "";
        let secondStr: string = "";
        let time = "0:00:" + parseInt(second_time) + "";
        if (parseInt(second_time) < 10) {
            time = "0:00:0" + parseInt(second_time) + ""
        }
        if (parseInt(second_time) > 60) {
            let second = parseInt(second_time) % 60;
            let secondTime = parseInt(second_time);
            let min = Math.floor(secondTime / 60);
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
                let hour = Math.floor((secondTime / 60) / 60);
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
    }
    /**把秒数转成(分钟：秒数)格式 */
    public static timeToString(timeNum: number): string {
        var timeMinute = parseInt("" + timeNum / 60 + "");
        var timeText: string;
        if (timeMinute < 1) {
            timeMinute = 0;
        }
        if (timeMinute == 0) {
            timeText = "" + (timeNum % 60) + ""
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
    }
    /**单转分钟 */
    public static timeMinuteToString(timeNum: number): string {
        let timeMinute = parseInt("" + timeNum / 60 + "")
        let timeText: string;
        timeText = "" + timeMinute + "";
        return timeText;
    }
    /**单转秒数 */
    public static timeSecondsToString(timeNum: number): string {
        let timeMinute = parseInt("" + timeNum % 60 + "")
        let timeText: string;
        if (timeMinute < 10) {
            timeText = "0" + timeMinute + "";
        }
        else {
            timeText = "" + timeMinute + "";
        }
        return timeText;
    }
}