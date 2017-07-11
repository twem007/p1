/**
 * 炸弹道具
*/
class BombProp extends BaseProp {

    private stopBlinkEffect() {
        this.stopAnimation();
    }

    private static _cacheName: string;
    public static getCacheName(): string {
        if (!BombProp._cacheName) {
            BombProp._cacheName = egret.getQualifiedClassName(this);
        }
        Log(`BombProp cacheName:${BombProp._cacheName}`);
        return BombProp._cacheName;
    }

}