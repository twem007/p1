var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResUtilsTest = (function () {
    function ResUtilsTest() {
        RES.createGroup('TestGroup', ['commonBoom_json']);
        core.ResUtils.loadGroups(['TestGroup'], null, null, this.onLoadComplete, this);
        core.ResUtils.loadGroups(['TestGroup'], null, null, this.onLoadComplete, this);
    }
    ResUtilsTest.prototype.onLoadComplete = function (data) {
        egret.log(data.curGroup + "\u52A0\u8F7D\u5B8C\u6BD5");
    };
    return ResUtilsTest;
}());
__reflect(ResUtilsTest.prototype, "ResUtilsTest");
