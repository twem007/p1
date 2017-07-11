var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CombatArr = (function (_super) {
    __extends(CombatArr, _super);
    function CombatArr() {
        return _super.call(this) || this;
    }
    return CombatArr;
}(eui.Component));
__reflect(CombatArr.prototype, "CombatArr");
//# sourceMappingURL=CombatArr.js.map