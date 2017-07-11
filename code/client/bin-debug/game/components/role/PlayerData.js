var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayerData = (function (_super) {
    __extends(PlayerData, _super);
    function PlayerData() {
        return _super.call(this) || this;
    }
    return PlayerData;
}(RoleData));
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map