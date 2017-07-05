module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
    export class DateUtils {
        public static s_date: Date = new Date();

        private static s_clintTimestamp: number;
        private static s_serverTimestamp: number;

        public constructor() {
        }

        public static setServerTime(time: number) {
            this.s_clintTimestamp = Date.now();
            this.s_serverTimestamp = time;
        }
        /**毫秒*/
        public static getServerTimeMill(): number {
            return this.s_serverTimestamp + (Date.now() - this.s_clintTimestamp);
        }
        /**
         * 
         * @param format  yyyy-MM-dd hh:mm:ss.S 或者 yyyy-M-d h:m:s.S
         */
        public static formatDate(format: string, date: Date): string {
            if (date == null) {
                date = DateUtils.s_date;
            }
            var o = {
                "M+": date.getUTCMonth() + 1,                 //月份   
                "d+": date.getUTCDate(),                    //日   
                "h+": date.getUTCHours(),                   //小时   
                "m+": date.getUTCMinutes(),                 //分   
                "s+": date.getUTCSeconds(),                 //秒   
                "q+": Math.floor((date.getUTCMonth() + 3) / 3), //季度   
                "S": date.getUTCMilliseconds()            //毫秒   
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
        }

        /**
         *  将毫秒数转换为 hh:mm:ss
         * @param milliseconds
         */
        public static format(milliseconds: number): string {
            let count: number = milliseconds;    //总毫秒数
            let ms: number = milliseconds % 1000;
            count = (count - ms) * 0.001;       //总秒数
            let s: number = count % 60;
            count = (count - s) / 60;           //总分钟数
            let m: number = count % 60;
            count = (count - m) / 60;           //总小时数
            return `${count < 0 ? 0 : count}:${m > 9 ? m : '0' + (m < 0 ? 0 : m)}:${s > 9 ? s : '0' + (s < 0 ? 0 : s)}`
        }
    }
}