var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundUtilsTest = (function () {
    function SoundUtilsTest() {
        core.SoundUtils.getInstance().playSound(1, 0);
        egret.setTimeout(function () {
            core.SoundUtils.getInstance().stopSoundByID(1);
        }, this, 1000);
        egret.setTimeout(function () {
            core.SoundUtils.getInstance().playSound(1, 0);
        }, this, 2000);
    }
    return SoundUtilsTest;
}());
__reflect(SoundUtilsTest.prototype, "SoundUtilsTest");
//# sourceMappingURL=SoundUtilsTest.js.map