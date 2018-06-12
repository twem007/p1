module core {
	/**
     * 日期处理类
     * 本类包含以下功能：
     * 1、计算网络延迟
     * 2、设置、获取服务器时间
     * 3、格式化时间格式
     */
    export class DateUtils {
        private static s_serverTimestamp = 0;  //服务器同步时间戳
        private static s_clientTimestamp = 0;  //客户端同步时间戳
        private static s_delay: number = 10;// 网络延迟
        private static s_sendTimestamp: number = 0;
        /**
         * 开始计算网络延迟
         * 在发送测试网络延迟的数据包前调用此方法
         */
        public static calcuNetDelayStart(): void {
            DateUtils.s_sendTimestamp = egret.getTimer();
        }
        /**
         * 结束计算网络延迟
         * 在接收到测试网络延迟的数据包返回后调用此方法
         */
        public static calcuNetDelayEnd(): void {//结束计算
            DateUtils.s_delay = egret.getTimer() - DateUtils.s_sendTimestamp;
        }
        /**
         * 获取服务器时间
         * 调用此方法前请先调用setServerTime同步服务器时间
         * @return number   单位毫秒
         */
        public static getServerTimeMill(): number {
            return this.s_serverTimestamp + (egret.getTimer() - this.s_clientTimestamp);
        }
        /**
         * 获取服务器时间
         * 调用此方法前请先调用setServerTime同步服务器时间
         * @return number   单位秒
         */
        public static getServerTime(): number {
            return Math.floor(DateUtils.getServerTimeMill() * 0.001);
        }
        /**
         * 设置服务器时间
         * @param  {number} time
         */
        public static setServerTime(time: number): void {
            this.s_serverTimestamp = time;
            this.s_clientTimestamp = egret.getTimer();
        }
        /**
         * 得到当前网络延迟
         * 调用此方法前请先调用calcuNetDelayStart及calcuNetDelayEnd计算网络延迟
         * @return number
         */
        public static getNetDelay(): number {
            return DateUtils.s_delay;
        }
        /**
         * 获取服务器时间的Ymd格式
         */
        public static getServerTimeYmd(): number {
            return Number(DateUtils.dateFormat("yyyyMMdd", DateUtils.getServerTime()));
        }
        /**
         * 格式化时间戳
         * @param  {string} fmt 格式化模版
         * @param  {number} time    单位秒
         * @return string 
         */
        public static dateFormat(fmt: string, time: number): string {
            let date = new Date(time * 1000);
            let o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }

        /**
         * 格式化时间戳
         * @param  {string} fmt     格式化模版
         * @param  {number} time    单位秒
         * @return string
         */
        public static diffTimeFormat(fmt: string, time: number): string {
            var day = Math.floor(time / 86400);
            var hour = Math.floor(time % 86400 / 3600);
            var minutent = Math.floor(time % 3600 / 60);
            var seconds = Math.floor(time % 60);
            if (!new RegExp("(d+)").test(fmt)) {
                hour += day * 24;
            }
            if (!new RegExp("(h+)").test(fmt)) {
                minutent += hour * 60;
            }

            var o = {
                "d+": day, //日 
                "h+": hour, //小时 
                "m+": minutent, //分 
                "s+": seconds, //秒 
            };
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ("" + o[k]).length == 1 ? "0" + o[k] : o[k]);
                }
            }
            return fmt;
        }

        /**
         * 返回 12:00:00这种格式
         * @param time
         * @return string
         */
        public static format1(time): string {
            return DateUtils.diffTimeFormat('hh:mm:ss', time);
        }

        /**
         * 返回 12-15 12:00这种格式
         * @param time
         * @return string
         */
        public static format2(time): string {
            return DateUtils.dateFormat('MM-dd hh:mm', time);
        }

        /**
         * 返回 00分00秒这种格式
         * @param time
         * @return string
         */
        public static format3(time): string {
            return DateUtils.dateFormat('mm分ss秒', time);
        }

        /**
         * 返回 00小时00分00秒这种格式
         * @param time
         * @return string
         */
        public static format4(time): string {
            return DateUtils.dateFormat('hh小时mm分ss秒', time);
        }

        /**
         * 返回 00:00这种格式
         * @param time
         * @return string
         */
        public static format5(time): string {
            return DateUtils.dateFormat('mm:ss', time);
        }

        /**
         * 返回 00日00时00分这种格式
         * @param time
         * @return string
         */
        public static format6(time): string {
            return DateUtils.diffTimeFormat('dd日hh时mm分', time);
        }

    }
}