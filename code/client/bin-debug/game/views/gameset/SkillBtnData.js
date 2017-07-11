var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**技能按钮数据 */
var SkillBtnData = (function () {
    function SkillBtnData() {
    }
    return SkillBtnData;
}());
/**穿越按钮位置(默认位置) */
SkillBtnData.m_pThroughBtnInitPoint = new egret.Point(134, 130);
/**加速按钮位置(默认位置) */
SkillBtnData.m_pSpeedBtnInitPoint = new egret.Point(304, 130);
/**设置穿越按钮位置 */
SkillBtnData.m_pThroughBtnSetPoint = new egret.Point(134, 130);
/**设置加速按钮位置 */
SkillBtnData.m_pSpeedBtnSetPoint = new egret.Point(304, 130);
/**穿越按钮缩放 */
SkillBtnData.m_pThroughBtnScale = 0.85;
/**加速按钮缩放 */
SkillBtnData.m_pSpeedBtnScale = 0.85;
/**按钮透明度 */
SkillBtnData.m_pSkillBtnAlpha = 1;
/**最小缩放比例 */
SkillBtnData.m_pScaling = 0.03;
/**最小透明比例 */
SkillBtnData.m_pAlphaRatio = 0.04;
/**穿越按钮缩放滑块位置*/
SkillBtnData.m_pThroughBlockValue = 5;
/**加速按钮缩放滑块位置 */
SkillBtnData.m_pSpeedBlockValue = 5;
/**按钮透明度滑块位置 */
SkillBtnData.m_pSkillAlphaBlockValue = 1;
__reflect(SkillBtnData.prototype, "SkillBtnData");
//# sourceMappingURL=SkillBtnData.js.map