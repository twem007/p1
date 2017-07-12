var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Goods = (function (_super) {
    __extends(Goods, _super);
    function Goods(data) {
        var _this = _super.call(this) || this;
        _this.p_data = data;
        return _this;
    }
    /**
     * 释放资源
     */
    Goods.prototype.release = function () {
        this.removeChildren();
        this.p_data = null;
        core.CachePool.addObj(egret.getQualifiedClassName(this), this);
    };
    /**
     * 得到道具数据
     */
    Goods.prototype.getData = function () {
        return this.p_data;
    };
    /**
    * 更新道具数据
    */
    Goods.prototype.setData = function (data) {
        this.p_data = data;
    };
    return Goods;
}(core.Component));
__reflect(Goods.prototype, "Goods");
//# sourceMappingURL=Goods.js.map