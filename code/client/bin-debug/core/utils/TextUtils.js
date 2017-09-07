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
                var reg = /\{[0-9]+?\}/;
                while (str.match(reg)) {
                    var arr = str.match(reg);
                    var arg = arr[0].match(/[0-9]+?/);
                    str = str.replace(reg, args[parseInt(arg[0])]);
                }
                return str;
            }
            return "";
        };
        /**
         *  解析富文本
         * @param htmltext
         */
        TextUtils.parseHtmlText = function (htmltext) {
            return TextUtils.s_textFlowParser.parse(htmltext);
        };
        /**
         *  显示文字提示
         * @param tip
         */
        TextUtils.showTextTip = function (tip, color) {
            if (color === void 0) { color = 0xFFFFFF; }
            var max_W = core.LayerCenter.stageWidth;
            var max_H = core.LayerCenter.stageHeight;
            var textfield = core.TextUtils.createTextfield(30);
            textfield.text = tip;
            textfield.textColor = color;
            textfield.width = textfield.textWidth;
            textfield.height = textfield.textHeight;
            textfield.x = (max_W - textfield.width) * 0.5;
            textfield.y = (max_H - textfield.height) * 0.5;
            core.LayerCenter.getInstance().stage.addChild(textfield);
            egret.Tween.get(textfield).to({ y: max_H * 0.4, alpha: 0 }, 1000, egret.Ease.circIn).call(function (target) {
                target.parent.removeChild(target);
            }, this, [textfield]);
        };
        TextUtils.s_textFlowParser = new egret.HtmlTextParser();
        return TextUtils;
    }());
    core.TextUtils = TextUtils;
    __reflect(TextUtils.prototype, "core.TextUtils");
})(core || (core = {}));
//# sourceMappingURL=TextUtils.js.map