var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**时间的动画特效 */
var TimeAnim = (function () {
    function TimeAnim() {
    }
    TimeAnim.startTimeAnim = function (group, img, lab) {
        group.visible = true;
        img.scaleX = 0.3;
        img.scaleY = 0.3;
        img.alpha = 1;
        lab.scaleX = 1.6;
        lab.scaleY = 1.6;
        lab.alpha = 0.5;
        lab.anchorOffsetX = lab.width * 0.5;
        lab.anchorOffsetY = lab.height * 0.5;
        egret.Tween.removeTweens(img);
        egret.Tween.removeTweens(lab);
        egret.Tween.get(lab).
            to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 150).
            to({ scaleX: 0.9, scaleY: 0.9 }, 100).
            to({ scaleX: 1, scaleY: 1 }, 50).
            wait(500).
            to({ alpha: 0 }, 250).
            call(function () { return (group.visible = false); });
        egret.Tween.get(img).
            to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 250).
            wait(100).
            to({ alpha: 0 }, 250);
    };
    return TimeAnim;
}());
__reflect(TimeAnim.prototype, "TimeAnim");
//# sourceMappingURL=TimeAnim.js.map