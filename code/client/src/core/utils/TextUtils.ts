module core {
	/**
	 *
	 * @author 
	 *
	 */
    export class TextUtils {
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
         *  显示文字提示
         * @param tip
         */
        public static showTextTip(tip: string, color: number = 0xFFFFFF): void {
            var max_W: number = core.LayerCenter.stageWidth;
            var max_H: number = core.LayerCenter.stageHeight;
            var textfield: egret.TextField = core.TextUtils.createTextfield(24);
            textfield.text = tip;
            textfield.textColor = color;
            textfield.width = textfield.textWidth;
            textfield.height = textfield.textHeight;
            textfield.x = (max_W - textfield.width) * 0.5;
            textfield.y = (max_H - textfield.height) * 0.5;
            core.LayerCenter.getInstance().stage.addChild(textfield);
            egret.Tween.get(textfield).to({ y: max_H * 0.4, alpha: 0 }, 2000).call(function (target: egret.TextField): void {
                target.parent.removeChild(target);
            }, this, [textfield]);
        }
        
        private static group: eui.Group = new eui.Group;
        private static image: eui.Image = new eui.Image;
        private static label: eui.Label = new eui.Label;
        /**唯一的文字提示带底图 */
        public static hintLabel(text: string) {
            let group:eui.Group=this.group;
            let image:eui.Image=this.image;
            let label:eui.Label=this.label;
            core.LayerCenter.getInstance().stage.addChildAt(group, 100);
            group.addChild(image);
            group.addChild(label);
            if(group.touchEnabled==true||group.touchChildren==true)
            {
                group.touchEnabled=false;
                group.touchChildren=false;
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
            label.verticalCenter=0;
            label.horizontalCenter=0;
            image.verticalCenter=0;
            image.horizontalCenter=0;
            group.visible = true;
            egret.Tween.removeTweens(group);
            egret.Tween.get(group).to({ y: 250 }, 200).to({ y: 225 }, 1000)
                .call(() => { group.visible = false });

        }
    }
}
