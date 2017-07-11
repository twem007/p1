var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 地图分块瓦片对象实现
 *
 */
var TileObject = (function (_super) {
    __extends(TileObject, _super);
    function TileObject(texture) {
        var _this = _super.call(this, texture) || this;
        _this.touchEnabled = false;
        return _this;
    }
    return TileObject;
}(egret.Bitmap));
__reflect(TileObject.prototype, "TileObject");
//# sourceMappingURL=TileObject.js.map