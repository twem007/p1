var ResUtilsTest = /** @class */ (function () {
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
//# sourceMappingURL=ResUtilsTest.js.map