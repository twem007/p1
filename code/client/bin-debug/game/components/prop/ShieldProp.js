var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 盾道具
*/
var ShieldProp = (function (_super) {
    __extends(ShieldProp, _super);
    function ShieldProp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShieldProp.getCacheName = function () {
        if (!ShieldProp._cacheName) {
            ShieldProp._cacheName = egret.getQualifiedClassName(this);
        }
        return ShieldProp._cacheName;
    };
    return ShieldProp;
}(BaseProp));
__reflect(ShieldProp.prototype, "ShieldProp");
//# sourceMappingURL=ShieldProp.js.map