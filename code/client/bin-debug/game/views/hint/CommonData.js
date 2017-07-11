var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonData = (function () {
    function CommonData() {
        /**显示内容 */
        this.m_pText = "游戏大卖特卖";
        /**调用方法 */
        this.m_pFun = null;
        /**按钮类型（默认单按钮）type=1  双按钮type=2*/
        this.m_pBtnType = 1;
    }
    return CommonData;
}());
__reflect(CommonData.prototype, "CommonData");
//# sourceMappingURL=CommonData.js.map