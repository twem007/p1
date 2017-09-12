var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    /**
     * 设置锚点居中
     */
    Utils.setAnchorCenter = function (component) {
        component.anchorOffsetX = component.width / 2;
        component.anchorOffsetY = component.height / 2;
    };
    /**
     * 计算两点距离
     * @param p1
     * @param p2
     * @returns {number}
     */
    Utils.distance = function (p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    /**
     * 判断直线A是否与线段B相交（线面相交）
     * @param A 线段A的一个端点
     * @param B 线段A的一个端点
     * @param C 线段B的一个端点
     * @param D 线段B的一个端点
     * @returns {boolean}
     */
    Utils.lineIntersectSide = function (A, B, C, D) {
        var fC = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
        var fD = (D.y - A.y) * (A.x - B.x) - (D.x - A.x) * (A.y - B.y);
        if (fC * fD > 0) {
            return false;
        }
        return true;
    };
    /**
     * 判断直线A是否与线段B相交（面面相交）
     * @param A 线段A的一个端点
     * @param B 线段A的一个端点
     * @param C 线段B的一个端点
     * @param D 线段B的一个端点
     * @returns {boolean}
     */
    Utils.sideIntersectSide = function (A, B, C, D) {
        if (!Utils.lineIntersectSide(A, B, C, D))
            return false;
        if (!Utils.lineIntersectSide(C, D, A, B))
            return false;
        return true;
    };
    /**
     * 通过边获取角度
     * @param oppositeSideLen 对边长
     * @param adjacentSide 邻边长
     */
    Utils.getAngleBySide = function (oppositeSideLen, adjacentSideLen) {
        return Math.atan(oppositeSideLen / adjacentSideLen) * (180 / Math.PI);
    };
    /**
     * 设置富文本
     */
    Utils.setRichText = function (text, str) {
        if (!text) {
            return;
        }
        if (str) {
            var htmlParser = new egret.HtmlTextParser();
            text.textFlow = htmlParser.parse(str);
        }
        else {
            text.text = str;
        }
    };
    /**基于矩形的碰撞检测*/
    Utils.hitTest = function (obj1, obj2) {
        if (obj1.getBounds != null && obj2.getBounds != null) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
    };
    /**
      * 统计字符串的字节数
      * @param str 需要统计的字符串
      * @return {number} 字节数长度
      */
    Utils.checkLength = function (str) {
        var bytes = new egret.ByteArray();
        bytes.writeUTF(str);
        return bytes.length;
    };
    /**
     * 返回以x轴右方为0开始的顺时针旋转的角度
     * centralPointX:中心点x坐标
     * centralPointY:中心点y坐标
     * distancePointX:距离点x坐标
     * distancePointY:距离点y坐标
     */
    Utils.pointAmongAngle = function (centralPointX, centralPointY, distancePointX, distancePointY) {
        var valueX = distancePointX - centralPointX;
        var valueY = distancePointY - centralPointY;
        var m_pDegrees = 0;
        if (valueX == 0 && valueY == 0) {
            return 0;
        }
        else if (valueX >= 0 && valueY >= 0) {
            m_pDegrees = Math.atan(valueY / valueX) * 180 / Math.PI;
        }
        else if (valueX <= 0 && valueY >= 0) {
            m_pDegrees = Math.atan(Math.abs(valueX) / valueY) * 180 / Math.PI + 90;
        }
        else if (valueX <= 0 && valueY <= 0) {
            m_pDegrees = Math.atan(Math.abs(valueY) / Math.abs(valueX)) * 180 / Math.PI + 180;
        }
        else if (valueX >= 0 && valueY <= 0) {
            m_pDegrees = Math.atan(valueX / Math.abs(valueY)) * 180 / Math.PI + 270;
        }
        return m_pDegrees;
    };
    /**
     * 一维数组转二维数组
     * @param arr   要转换的数组
     * @param cols  单行列数
     */
    Utils.arrToArr2 = function (arr, cols) {
        var arr2 = [];
        if (arr) {
            var rowArr = void 0;
            for (var i = 0, iLen = arr.length; i < iLen; i++) {
                if (i % cols === 0) {
                    rowArr = [];
                    arr2.push(rowArr);
                }
                rowArr.push(arr[i]);
            }
        }
        return arr2;
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
/**
 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
 */
function createBitmapByName(name) {
    var result = new egret.Bitmap();
    var texture = RES.getRes(name);
    result.texture = texture;
    return result;
}
/**
   * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
   */
function createBitmapFromSheet(name, sheetName) {
    if (sheetName === void 0) { sheetName = "gameRes"; }
    var sheet = RES.getRes(sheetName);
    var texture = sheet.getTexture(name);
    var result = new egret.Bitmap();
    result.texture = texture;
    return result;
}
function getTextureFromSheet(name, sheetName) {
    if (sheetName === void 0) { sheetName = "gameRes"; }
    var sheet = RES.getRes(sheetName);
    var result = sheet.getTexture(name);
    return result;
}
//# sourceMappingURL=Utils.js.map