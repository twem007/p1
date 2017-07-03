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
    }
}