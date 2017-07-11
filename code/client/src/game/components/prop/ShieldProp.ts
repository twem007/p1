/**
 * 盾道具
*/
class ShieldProp extends BaseProp {

    private static _cacheName: string;
    public static getCacheName(): string {
        if (!ShieldProp._cacheName) {
            ShieldProp._cacheName = egret.getQualifiedClassName(this);
        }
        return ShieldProp._cacheName;
    }

}