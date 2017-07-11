var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 主界面排行榜的人物头像
 */
var MainRankFace = (function (_super) {
    __extends(MainRankFace, _super);
    function MainRankFace() {
        return _super.call(this) || this;
    }
    return MainRankFace;
}(eui.Component));
__reflect(MainRankFace.prototype, "MainRankFace");
//# sourceMappingURL=MainRankFace.js.map