var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundViewData = (function () {
    function SoundViewData() {
    }
    return SoundViewData;
}());
/**音乐开关(1默认开,0关闭) */
SoundViewData.m_pIsMusic = 0;
/**音效开关(1默认开,0关闭) */
SoundViewData.m_pIsSound = 0;
/**音乐滑块位置 */
SoundViewData.m_pMusicBlockValue = 5;
/**音效滑块位置 */
SoundViewData.m_pSoundBlockValue = 5;
__reflect(SoundViewData.prototype, "SoundViewData");
//# sourceMappingURL=SoundViewData.js.map