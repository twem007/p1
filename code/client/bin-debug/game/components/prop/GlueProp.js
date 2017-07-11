var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 胶水道具类，可拾取
 */
var GlueProp = (function (_super) {
    __extends(GlueProp, _super);
    function GlueProp(data) {
        return _super.call(this, data) || this;
    }
    GlueProp.getCacheName = function () {
        if (!GlueProp._cacheName) {
            GlueProp._cacheName = egret.getQualifiedClassName(this);
        }
        return GlueProp._cacheName;
    };
    return GlueProp;
}(BaseProp));
__reflect(GlueProp.prototype, "GlueProp");
//# sourceMappingURL=GlueProp.js.map