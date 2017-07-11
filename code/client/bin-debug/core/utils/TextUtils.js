var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     *
     * @author
     *
     */
    var TextUtils = (function () {
        function TextUtils() {
        }
        /**
         *  创建文本
         * @param size      字号
         * @param color     字体颜色
         * @param vAlign    纵向对齐方式 默认：egret.VerticalAlign.MIDDLE
         * @param hAlign    横向对齐方式 默认：egret.HorizontalAlign.CENTER
         * @param family    字体 默认:Verdana
         */
        TextUtils.createTextfield = function (size, color, vAlign, hAlign, family) {
            if (color === void 0) { color = 0xFFFFFF; }
            if (vAlign === void 0) { vAlign = egret.VerticalAlign.MIDDLE; }
            if (hAlign === void 0) { hAlign = egret.HorizontalAlign.CENTER; }
            if (family === void 0) { family = "Verdana"; }
            var textfield = new egret.TextField();
            textfield.size = size;
            textfield.textColor = color;
            textfield.textAlign = hAlign;
            textfield.verticalAlign = vAlign;
            textfield.fontFamily = family;
            textfield.cacheAsBitmap = true;
            return textfield;
        };
        /**
         *  字符参数替换
         * @param str       "参数替换{0}和{1}"
         * @param args      [x,y]
         */
        TextUtils.formatString = function (str, args) {
            if (str) {
                var reg = /\{[0-9]+\}/;
                while (str.match(reg)) {
                    var arr = str.match(reg);
                    str = str.replace(reg, args[arr.index]);
                }
                return str;
            }
            return "";
        };
        /**
         *  显示文字提示
         * @param tip
         */
        TextUtils.showTextTip = function (tip, color) {
            if (color === void 0) { color = 0xFFFFFF; }
            var max_W = core.LayerCenter.stageWidth;
            var max_H = core.LayerCenter.stageHeight;
            var textfield = core.TextUtils.createTextfield(24);
            textfield.text = tip;
            textfield.textColor = color;
            textfield.width = textfield.textWidth;
            textfield.height = textfield.textHeight;
            textfield.x = (max_W - textfield.width) * 0.5;
            textfield.y = (max_H - textfield.height) * 0.5;
            core.LayerCenter.getInstance().stage.addChild(textfield);
            egret.Tween.get(textfield).to({ y: max_H * 0.4, alpha: 0 }, 2000).call(function (target) {
                target.parent.removeChild(target);
            }, this, [textfield]);
        };
        /**唯一的文字提示带底图 */
        TextUtils.hintLabel = function (text) {
            var group = this.group;
            var image = this.image;
            var label = this.label;
            core.LayerCenter.getInstance().stage.addChildAt(group, 100);
            group.addChild(image);
            group.addChild(label);
            if (group.touchEnabled == true || group.touchChildren == true) {
                group.touchEnabled = false;
                group.touchChildren = false;
            }
            label.text = text;
            image.width = label.width + 200;
            group.width = core.LayerCenter.stageWidth;
            group.anchorOffsetX = group.width * 0.5;
            group.x = core.LayerCenter.stageWidth * 0.5;
            group.y = core.LayerCenter.stageHeight * 0.5;
            label.fontFamily = "Microsoft YaHei";
            label.anchorOffsetX = label.width * 0.5;
            label.anchorOffsetY = label.height * 0.5;
            label.x = core.LayerCenter.stageWidth * 0.5;
            image.source = "combat_tiao_3_png";
            image.anchorOffsetX = image.width * 0.5;
            image.anchorOffsetY = image.height * 0.5;
            image.x = core.LayerCenter.stageWidth * 0.5;
            label.verticalCenter = 0;
            label.horizontalCenter = 0;
            image.verticalCenter = 0;
            image.horizontalCenter = 0;
            group.visible = true;
            egret.Tween.removeTweens(group);
            egret.Tween.get(group).to({ y: 250 }, 200).to({ y: 225 }, 1000)
                .call(function () { group.visible = false; });
        };
        return TextUtils;
    }());
    TextUtils.group = new eui.Group;
    TextUtils.image = new eui.Image;
    TextUtils.label = new eui.Label;
    core.TextUtils = TextUtils;
    __reflect(TextUtils.prototype, "core.TextUtils");
})(core || (core = {}));
//# sourceMappingURL=TextUtils.js.map