/**
 * 胶水道具类，可拾取
 */
class GlueProp extends BaseProp {
    constructor(data: BattleGoodsData) {
        super(data);

    }

    private static _cacheName: string;
    public static getCacheName(): string {
        if (!GlueProp._cacheName) {
            GlueProp._cacheName = egret.getQualifiedClassName(this);
        }
        return GlueProp._cacheName;
    }
}