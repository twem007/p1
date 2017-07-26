module core {
	/**
	 *
	 * @author 
	 *
	 */
    export class TextUtils {

        private static s_textFlowParser: egret.HtmlTextParser = new egret.HtmlTextParser();

        public constructor() {
        }

        /**
         *  创建文本
         * @param size      字号
         * @param color     字体颜色
         * @param vAlign    纵向对齐方式 默认：egret.VerticalAlign.MIDDLE
         * @param hAlign    横向对齐方式 默认：egret.HorizontalAlign.CENTER
         * @param family    字体 默认:Verdana
         */
        public static createTextfield(size: number,
            color: number = 0xFFFFFF,
            vAlign: string = egret.VerticalAlign.MIDDLE,
            hAlign: string = egret.HorizontalAlign.CENTER,
            family: string = "Verdana"): egret.TextField {
            var textfield: egret.TextField = new egret.TextField();
            textfield.size = size;
            textfield.textColor = color;
            textfield.textAlign = hAlign;
            textfield.verticalAlign = vAlign;
            textfield.fontFamily = family;
            textfield.cacheAsBitmap = true;
            return textfield;
        }

        /**
         *  字符参数替换
         * @param str       "参数替换{0}和{1}"
         * @param args      [x,y]    
         */
        public static formatString(str: string, args: string[]): string {
            if (str) {
                var reg: RegExp = /\{[0-9]+\}/;
                while (str.match(reg)) {
                    var arr: RegExpMatchArray = str.match(reg);
                    str = str.replace(reg, args[arr.index]);
                }
                return str;
            }
            return "";
        }
        /**
         *  解析富文本
         * @param htmltext
         */
        public static parseHtmlText(htmltext: string): egret.ITextElement[] {
            return TextUtils.s_textFlowParser.parse(htmltext);
        }
        /**
         *  显示文字提示
         * @param tip
         */
        public static showTextTip(tip: string, color: number = 0xFFFFFF): void {
            var max_W: number = core.LayerCenter.stageWidth;
            var max_H: number = core.LayerCenter.stageHeight;
            var textfield: egret.TextField = core.TextUtils.createTextfield(30);
            textfield.text = tip;
            textfield.textColor = color;
            textfield.width = textfield.textWidth;
            textfield.height = textfield.textHeight;
            textfield.x = (max_W - textfield.width) * 0.5;
            textfield.y = (max_H - textfield.height) * 0.5;
            core.LayerCenter.getInstance().stage.addChild(textfield);
            egret.Tween.get(textfield).to({ y: max_H * 0.4, alpha: 0 }, 1000, egret.Ease.circIn).call(function (target: egret.TextField): void {
                target.parent.removeChild(target);
            }, this, [textfield]);
        }
    }
}
