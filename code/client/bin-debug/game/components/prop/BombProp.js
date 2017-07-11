var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 炸弹道具
*/
var BombProp = (function (_super) {
    __extends(BombProp, _super);
    function BombProp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BombProp.prototype.stopBlinkEffect = function () {
        this.stopAnimation();
    };
    BombProp.getCacheName = function () {
        if (!BombProp._cacheName) {
            BombProp._cacheName = egret.getQualifiedClassName(this);
        }
        Log("BombProp cacheName:" + BombProp._cacheName);
        return BombProp._cacheName;
    };
    return BombProp;
}(BaseProp));
__reflect(BombProp.prototype, "BombProp");
//# sourceMappingURL=BombProp.js.map