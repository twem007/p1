/**
 * Created by YW0977 on 2017/4/5.
 */
var PictureQualityLevel;
(function (PictureQualityLevel) {
    //画质等级低中高
    PictureQualityLevel[PictureQualityLevel["low"] = 1] = "low";
    PictureQualityLevel[PictureQualityLevel["middle"] = 2] = "middle";
    PictureQualityLevel[PictureQualityLevel["high"] = 3] = "high";
})(PictureQualityLevel || (PictureQualityLevel = {}));
var PictureQualityEffect;
(function (PictureQualityEffect) {
    //画质效果
    PictureQualityEffect[PictureQualityEffect["JewelBlinkEffect"] = 101] = "JewelBlinkEffect";
    PictureQualityEffect[PictureQualityEffect["JewelLightEffect"] = 102] = "JewelLightEffect";
    PictureQualityEffect[PictureQualityEffect["JewelCreateScaleEffect"] = 103] = "JewelCreateScaleEffect";
    PictureQualityEffect[PictureQualityEffect["JewelFractureEffect"] = 104] = "JewelFractureEffect";
    PictureQualityEffect[PictureQualityEffect["PowerFractureEffect"] = 105] = "PowerFractureEffect";
    PictureQualityEffect[PictureQualityEffect["DeathEffect"] = 106] = "DeathEffect";
    PictureQualityEffect[PictureQualityEffect["TailEffect"] = 107] = "TailEffect";
    PictureQualityEffect[PictureQualityEffect["SpeedEffect"] = 108] = "SpeedEffect";
    PictureQualityEffect[PictureQualityEffect["WallDiscolor"] = 109] = "WallDiscolor"; //变身时墙变色
})(PictureQualityEffect || (PictureQualityEffect = {}));
//# sourceMappingURL=PictureQuality.js.map