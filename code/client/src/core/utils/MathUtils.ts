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
    }
}