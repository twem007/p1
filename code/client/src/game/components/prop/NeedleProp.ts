/**
 * 针道具
*/
class NeedleProp extends BaseProp {

    private stopBlinkEffect() {
        this.stopAnimation();
    }


    private static _cacheName: string;
    public static getCacheName(): string {
        if (!NeedleProp._cacheName) {
            NeedleProp._cacheName = egret.getQualifiedClassName(this);
        }
        return NeedleProp._cacheName;
    }
}