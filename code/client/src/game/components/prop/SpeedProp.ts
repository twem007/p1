/**
 * 加速道具
*/
class SpeedProp extends BaseProp {

    private static _cacheName: string;
    public static getCacheName(): string {
        if (!SpeedProp._cacheName) {
            SpeedProp._cacheName = egret.getQualifiedClassName(this);
        }
        return SpeedProp._cacheName;
    }
}