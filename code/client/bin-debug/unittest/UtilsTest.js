var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UtilsTest = (function () {
    function UtilsTest() {
        var templete = "class {0} {\n{1}}\n{2}";
        egret.log(core.TextUtils.formatString(templete, ['UtilsTest', "egret.log('')", 'testend']));
    }
    return UtilsTest;
}());
__reflect(UtilsTest.prototype, "UtilsTest");
//# sourceMappingURL=UtilsTest.js.map