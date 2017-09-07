var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIManager = (function () {
    function UIManager() {
    }
    /**
        * 舞台改变 更新位置
        * obj 要初始化的对象
        * pointX:初始的x值
        * pointY:初始的y值
        */
    UIManager.updataPoint = function (obj, pointX, pointY) {
        var stageWidth = core.LayerCenter.stageWidth;
        var stageHeight = core.LayerCenter.stageHeight;
        var widthPercentage = stageWidth / this.CONTENT_WIDTH;
        var hightPercentage = stageHeight / this.CONTENT_HEIGHT;
        obj.x = widthPercentage * pointX;
        obj.y = hightPercentage * pointY;
    };
    /**根据舞台宽比改变X值
     * obj:要更新的对象
     * pointX：x坐标
     */
    UIManager.updataX = function (obj, pointX) {
        var stageWidth = core.LayerCenter.stageWidth;
        var widthPercentage = stageWidth / this.CONTENT_WIDTH;
        obj.x = widthPercentage * pointX;
    };
    /**
     * 根据舞台高比改变Y值
     * obj:要更新的对象
     * pointY：y坐标
     */
    UIManager.updataY = function (obj, pointY) {
        var stageHeight = core.LayerCenter.stageHeight;
        var hightPercentage = stageHeight / this.CONTENT_HEIGHT;
        obj.y = hightPercentage * pointY;
    };
    /*
     * 舞台改变 更新大小
     * obj 要初始化的对象
     */
    UIManager.updataScale = function (obj, initScale) {
        if (initScale === void 0) { initScale = 1; }
        var stageWidth = core.LayerCenter.stageWidth;
        var stageHeight = core.LayerCenter.stageHeight;
        var widthPercentage = stageWidth / this.CONTENT_WIDTH;
        var hightPercentage = stageHeight / this.CONTENT_HEIGHT;
        obj.scaleX = widthPercentage;
        obj.scaleY = hightPercentage;
    };
    /**
     * 更新舞台时按比例修改对象位置和缩放
     * obj:要更新的对象
     * pointX:对象的基础x
     * pointY:对象的基础y
     * scaleX:对象的基础缩放x
     * scaleY:对象的基础缩放y
     */
    UIManager.updataStageChangeObj = function (obj, pointX, pointY, scaleX, scaleY) {
        var stageWidth = core.LayerCenter.stageWidth;
        var stageHeight = core.LayerCenter.stageHeight;
        var widthPercentage = stageWidth / this.CONTENT_WIDTH;
        var hightPercentage = stageHeight / this.CONTENT_HEIGHT;
        obj.x = widthPercentage * pointX;
        obj.y = hightPercentage * pointY;
        obj.scaleX = widthPercentage * scaleX;
        obj.scaleY = hightPercentage * scaleY;
    };
    /**根据宽来对对象进行等比缩放
     * obj:要改变的对象
     * scale:对象原宽缩放比
     */
    UIManager.changeSizeByWidth = function (obj, scale) {
        var stageWidth = core.LayerCenter.stageWidth;
        var stageHeight = core.LayerCenter.stageHeight;
        var widthPercentage = stageWidth / this.CONTENT_WIDTH;
        obj.scaleX = widthPercentage * scale;
        obj.scaleY = widthPercentage * scale;
    };
    /**根据宽比修改比例 ，高度拉长 ，适配x坐标
     *
     */
    UIManager.changeByWidthAndHeight = function (obj, scale, initHeight, initX) {
        var stageWidth = core.LayerCenter.stageWidth;
        var stageHeight = core.LayerCenter.stageHeight;
        var widthPercentage = stageWidth / this.CONTENT_WIDTH;
        var height = 1 + (1 - stageWidth / this.CONTENT_WIDTH);
        obj.scaleX = widthPercentage * scale;
        obj.scaleY = widthPercentage * scale;
        obj.x = initX * widthPercentage;
        if (height > 1) {
            obj.height = initHeight * height;
        }
        else {
            obj.height = initHeight;
        }
    };
    /**左下角适配
     * obj:要改变的对象
     * pointX:距离舞台的左边距离
     * pointY:距离舞台的下边距离
     */
    UIManager.leftBelowAdaptive = function (obj, pointX, pointY) {
        var stageWidth = core.LayerCenter.stageWidth;
        var stageHeight = core.LayerCenter.stageHeight;
        obj.x = pointX;
        obj.y = stageHeight - (this.CONTENT_HEIGHT - pointY);
    };
    /**右下角适配
    * obj:要改变的对象
    * pointX:距离舞台的左边距离
    * pointY:距离舞台的下边距离
    */
    UIManager.rightBelowAdaptive = function (obj, pointX, pointY) {
        var stageWidth = core.LayerCenter.stageWidth;
        var stageHeight = core.LayerCenter.stageHeight;
        obj.y = stageHeight - (this.CONTENT_HEIGHT - pointY);
        obj.x = stageWidth - (this.CONTENT_WIDTH - pointX);
    };
    /**
     * 根据输入坐标获取舞台改变后的宽高比坐标
     * pointX：x坐标
     * pointY: y坐标
     * return point  返回改变后的比例坐标
     */
    UIManager.getPoint = function (pointX, pointY) {
        var stageWidth = core.LayerCenter.stageWidth;
        var stageHeight = core.LayerCenter.stageHeight;
        var widthPercentage = stageWidth / this.CONTENT_WIDTH;
        var hightPercentage = stageHeight / this.CONTENT_HEIGHT;
        var point = new egret.Point();
        point.x = widthPercentage * pointX;
        point.y = hightPercentage * pointY;
        return point;
    };
    /**根据舞台边距获取对应的坐标（目前暂时用于技能按钮） */
    UIManager.setBtnPoint = function (obj, pointX, pointY) {
        var stageWidth = core.LayerCenter.stageWidth;
        var stageHeight = core.LayerCenter.stageHeight;
        obj.x = stageWidth - (pointX * (stageWidth / this.CONTENT_WIDTH));
        obj.y = stageHeight - pointY;
    };
    /**高小于原来的比例调整对象缩放并修改Y值 */
    UIManager.changeHeightSize = function (obj, initSize, initY) {
        var stageHeight = core.LayerCenter.stageHeight;
        var stagePercentage = stageHeight / this.CONTENT_HEIGHT;
        if (stagePercentage < 1) {
            obj.scaleY = initSize * stagePercentage;
            obj.y = initY * stagePercentage;
        }
        else {
            obj.scaleY = initSize;
            obj.y = initY;
        }
    };
    /**宽小于原来的比例调整对象缩放 */
    UIManager.changeWidthSize = function (obj, initSize) {
        var stageWidth = core.LayerCenter.stageWidth;
        var stagePercentage = stageWidth / this.CONTENT_WIDTH;
        if (stagePercentage < 1) {
            obj.scaleX = initSize * stagePercentage;
            obj.scaleY = initSize * stagePercentage;
        }
        else {
            obj.scaleX = 1 - (initSize * stagePercentage - 1);
            obj.scaleY = 1 - (initSize * stagePercentage - 1);
        }
    };
    /**根据屏幕高比如果小于原来尺寸对obj放大 */
    UIManager.upHeightSize = function (obj, initSize) {
        var stageHeight = core.LayerCenter.stageHeight;
        if (stageHeight < this.CONTENT_HEIGHT) {
            var stagePercentage = this.CONTENT_HEIGHT / stageHeight;
            obj.scaleX = initSize * stagePercentage;
            obj.scaleY = initSize * stagePercentage;
        }
        else {
            obj.scaleX = initSize;
            obj.scaleY = initSize;
        }
    };
    /**根据屏幕高比如果小于原来尺寸对obj的宽高放大 */
    UIManager.upHW = function (obj, initWidth, initHeight) {
        var stageHeight = core.LayerCenter.stageHeight;
        if (stageHeight < this.CONTENT_HEIGHT) {
            var stagePercentage = this.CONTENT_HEIGHT / stageHeight;
            obj.width = initWidth * stagePercentage;
            obj.height = initHeight * stagePercentage;
        }
        else {
            obj.width = initWidth;
            obj.height = initHeight;
        }
    };
    UIManager.changePoint = function (obj, initX, initY) {
        var stageHeight = core.LayerCenter.stageHeight;
        var stageHeightPercentage = stageHeight / this.CONTENT_HEIGHT;
        if (stageHeightPercentage > 1) {
            obj.scaleY = initY * stageHeightPercentage;
        }
        else {
            obj.scaleY = initY;
        }
        var stageWidth = core.LayerCenter.stageWidth;
        var stageWidthPercentage = stageWidth / this.CONTENT_WIDTH;
        if (stageWidthPercentage > 1) {
            obj.scaleX = initX * stageWidthPercentage;
        }
        else {
            obj.scaleX = initX;
        }
    };
    /**二级界面的出现效果 */
    UIManager.startEffect = function (group) {
        group.alpha = 0;
        group.scaleX = 0;
        group.scaleY = 0;
        egret.Tween.get(group).to({ alpha: 1, scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 100);
    };
    UIManager.CONTENT_WIDTH = 1334;
    UIManager.CONTENT_HEIGHT = 750;
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map