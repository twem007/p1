var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleBoxGoods = (function (_super) {
    __extends(BattleBoxGoods, _super);
    function BattleBoxGoods(data) {
        return _super.call(this, data) || this;
    }
    Object.defineProperty(BattleBoxGoods.prototype, "data", {
        get: function () {
            return this.p_data;
        },
        enumerable: true,
        configurable: true
    });
    return BattleBoxGoods;
}(ImageGoods));
__reflect(BattleBoxGoods.prototype, "BattleBoxGoods");
//# sourceMappingURL=BattleBoxGoods.js.map