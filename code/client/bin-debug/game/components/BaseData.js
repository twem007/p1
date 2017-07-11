var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseData = (function () {
    function BaseData() {
    }
    BaseData.prototype.reset = function () {
        throw new Error('Reset方法尚未实现，无法Reset数据');
    };
    BaseData.prototype.clone = function () {
        throw new Error('Clone方法尚未实现，无法Clone数据');
    };
    return BaseData;
}());
__reflect(BaseData.prototype, "BaseData");
//# sourceMappingURL=BaseData.js.map