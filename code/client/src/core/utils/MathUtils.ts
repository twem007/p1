module core {
    export class MathUtils {

        public static ceil(value: number): number {
            if (value % 1 == 0) {
                return value;
            }
            if (value > 0) {
                return (value + 1) << 0;
            } else {
                return value << 0;
            }
        }
        /**
         * 得到 [min,max) 范围内的随机数
         */
        public static random(min: number, max: number): number {
            return Math.random() * (max - min) + min << 0;
        }
        /**
         * 随机一个整数[n,m)
         */
        public static randomIntN(n: number, m: number): number {
            return parseInt(MathUtils.number2str(Math.random() * (m - n) + n), 10);
        }
        /**
         * 随机一个整数(n,m]
         */
        public static randomintM(n: number, m: number): number {
            return Math.floor(Math.random() * (m - n) + n) + 1;
        }
        /**
         * 随机一个整数(n,m)
         */
        public static randomInt(n: number, m: number): number {
            return Math.round(Math.random() * (m - n - 2) + n + 1);
        }
        /**
         * 随机一个整数[n,m]
         */
        public static randomIntNM(n: number, m: number): number {
            return Math.round(Math.random() * (m - n) + n);
        }
        /**
         * 数组里随机一个元素
         */
        public static getRandomElement(arr: any[]): any {
            var key: number = Math.floor(Math.random() * arr.length);
            return arr[key];
        }

        public static number2str(num: number): string {
            return <string><any>num;
        }
        /**
          * 计算两点距离
          * @param p1
          * @param p2
          * @returns {number}
          */
        public static distance(p1: egret.Point, p2: egret.Point): number {
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        }

    }
}