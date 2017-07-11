var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 针道具
*/
var NeedleProp = (function (_super) {
    __extends(NeedleProp, _super);
    function NeedleProp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NeedleProp.prototype.stopBlinkEffect = function () {
        this.stopAnimation();
    };
    NeedleProp.getCacheName = function () {
        if (!NeedleProp._cacheName) {
            NeedleProp._cacheName = egret.getQualifiedClassName(this);
        }
        return NeedleProp._cacheName;
    };
    return NeedleProp;
}(BaseProp));
__reflect(NeedleProp.prototype, "NeedleProp");
//# sourceMappingURL=NeedleProp.js.map