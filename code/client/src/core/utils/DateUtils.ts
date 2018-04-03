module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export class DateUtils {
        private static s_serverTimestamp = 0;  //服务器同步时间戳
        private static s_clientTimestamp = 0;  //客户端同步时间戳
        private static s_delay: number = 10;// 网络延迟
        private static s_sendTimestamp: number = 0;
        /**
         * 开始计算网络延迟
         */
        public static calcuNetDelayStart() {
            DateUtils.s_sendTimestamp = egret.getTimer();
        }
        /**
         * 结束计算网络延迟
         */
        public static calcuNetDelayEnd(): void {//结束计算
            DateUtils.s_delay = egret.getTimer() - DateUtils.s_sendTimestamp;
        }
        /**
         * 获取服务器时间
         */
        public static getServerTime(): number {
            return Math.floor(DateUtils.getServerTimeMill() * 0.001);
        }

        public static setServerTime(time: number) {
            this.s_serverTimestamp = time;
            this.s_clientTimestamp = egret.getTimer();
        }
        /**毫秒*/
        public static getServerTimeMill(): number {
            return this.s_serverTimestamp + (egret.getTimer() - this.s_clientTimestamp);
        }
        /**当前网络延迟*/
        public static getNetDelay() {
            return DateUtils.s_delay;
        }
        /**
         * 获取服务器时间的Ymd格式
         */
        public static getServerTimeYmd(): number {
            return Number(DateUtils.dateFormat("yyyyMMdd", DateUtils.getServerTime()));
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


        /**
     * 将时间长度格式化
     */
        public static diffTimeFormat(fmt: string, time: number, type: number = 1) {
            var day = Math.floor(time / 86400); //Utils.number2int(time / 86400);
            var hour = Math.floor(time % 86400 / 3600); //Utils.number2int(time % 86400 / 3600);
            var minutent = Math.floor(time % 3600 / 60); //Utils.number2int(time % 3600 / 60);
            var seconds = Math.floor(time % 60); //Utils.number2int(time % 60);
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
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) {
                    //                    debug((("00" + o[k]).substr(("" + o[k]).length)));
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ("" + o[k]).length == 1 ? "0" + o[k] : o[k]);
                }

            return fmt;
        }

        /**
     * 返回 12:00:00这种格式
     * @param time
     * @returns {string}
     */
        public static format1(time) {
            return DateUtils.diffTimeFormat('hh:mm:ss', time);
        }

        /**
         * 返回 12-15 12:00这种格式
         * @param time
         * @returns {string}
         */
        public static format2(time) {
            return DateUtils.dateFormat('MM-dd hh:mm', time);
        }

        /**
         * 返回 00分00秒这种格式
         * @param time
         * @returns {string}
         */
        public static format3(time) {
            return DateUtils.dateFormat('mm分ss秒', time);
        }

        /**
         * 返回 00小时00分00秒这种格式
         * @param time
         * @returns {string}
         */
        public static format4(time) {
            return DateUtils.dateFormat('hh小时mm分ss秒', time);
        }

        /**
         * 返回 00:00这种格式
         * @param time
         * @returns {string}
         */
        public static format5(time) {
            return DateUtils.dateFormat('mm:ss', time);
        }

        /**
         * 返回 00日00时00分这种格式
         * @param time
         * @returns {string}
         */
        public static format6(time) {
            return DateUtils.diffTimeFormat('dd日hh时mm分', time);
        }

    }
}