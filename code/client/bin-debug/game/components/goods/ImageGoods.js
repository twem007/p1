var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ImageGoods = (function (_super) {
    __extends(ImageGoods, _super);
    function ImageGoods(data) {
        return _super.call(this, data) || this;
    }
    return ImageGoods;
}(Goods));
__reflect(ImageGoods.prototype, "ImageGoods");
//# sourceMappingURL=ImageGoods.js.map