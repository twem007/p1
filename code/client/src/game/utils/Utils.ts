class Utils {
    /**
     * 设置锚点居中
     */
    public static setAnchorCenter(component: egret.DisplayObject) {
        component.anchorOffsetX = component.width / 2;
        component.anchorOffsetY = component.height / 2;
    }

    /**
     * 计算两点距离
     * @param p1
     * @param p2
     * @returns {number}
     */
    public static distance(p1: egret.Point, p2: egret.Point): number {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    /**
     * 判断直线A是否与线段B相交（线面相交）
     * @param A 线段A的一个端点
     * @param B 线段A的一个端点
     * @param C 线段B的一个端点
     * @param D 线段B的一个端点
     * @returns {boolean}
     */
    public static lineIntersectSide(A: egret.Point, B: egret.Point, C: egret.Point, D: egret.Point): boolean {
        var fC: number = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
        var fD: number = (D.y - A.y) * (A.x - B.x) - (D.x - A.x) * (A.y - B.y);

        if (fC * fD > 0) {
            return false;
        }
        return true;
    }

    /**
     * 判断直线A是否与线段B相交（面面相交）
     * @param A 线段A的一个端点
     * @param B 线段A的一个端点
     * @param C 线段B的一个端点
     * @param D 线段B的一个端点
     * @returns {boolean}
     */
    public static sideIntersectSide(A: egret.Point, B: egret.Point, C: egret.Point, D: egret.Point): boolean {
        if (!Utils.lineIntersectSide(A, B, C, D))
            return false;
        if (!Utils.lineIntersectSide(C, D, A, B))
            return false;

        return true;
    }

    /**
     * 通过边获取角度
     * @param oppositeSideLen 对边长
     * @param adjacentSide 邻边长
     */
    public static getAngleBySide(oppositeSideLen: number, adjacentSideLen: number): number {
        return Math.atan(oppositeSideLen / adjacentSideLen) * (180 / Math.PI);
    }

    /**
     * 设置富文本
     */
    public static setRichText(text: egret.TextField | eui.Label, str: string): void {
        if (!text) {
            return;
        }
        if (str) {
            let htmlParser: egret.HtmlTextParser = new egret.HtmlTextParser();
            text.textFlow = htmlParser.parse(str);
        } else {
            text.text = str;
        }
    }
    /**基于矩形的碰撞检测*/
    public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        if (obj1.getBounds != null && obj2.getBounds != null) {
            var rect1: egret.Rectangle = obj1.getBounds();
            var rect2: egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
    }

    /**
      * 统计字符串的字节数
      * @param str 需要统计的字符串
      * @return {number} 字节数长度
      */
    public static checkLength(str: string): number {
        let bytes: egret.ByteArray = new egret.ByteArray();
        bytes.writeUTF(str);
        return bytes.length;
    }

    /**
     * 返回以x轴右方为0开始的顺时针旋转的角度
     * centralPointX:中心点x坐标
     * centralPointY:中心点y坐标
     * distancePointX:距离点x坐标
     * distancePointY:距离点y坐标
     */
    public static pointAmongAngle(centralPointX: number, centralPointY: number, distancePointX: number, distancePointY: number): number {
        let valueX = distancePointX - centralPointX;
        let valueY = distancePointY - centralPointY;
        let m_pDegrees = 0;
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
    }
    /**
     * 一维数组转二维数组
     * @param arr   要转换的数组
     * @param cols  单行列数
     */
    public static arrToArr2(arr: any[], cols: number): any[] {
        let arr2: any[] = [];
        if (arr) {
            let rowArr: any[];
            for (let i: number = 0, iLen: number = arr.length; i < iLen; i++) {
                if (i % cols === 0) {
                    rowArr = [];
                    arr2.push(rowArr);
                }
                rowArr.push(arr[i]);
            }
        }
        return arr2;
    }
}

/**
 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
 */
function createBitmapByName(name: string): egret.Bitmap {
    var result: egret.Bitmap = new egret.Bitmap();
    var texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
}
/**
   * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
   */
function createBitmapFromSheet(name: string, sheetName: string = "gameRes"): egret.Bitmap {
    var sheet: egret.SpriteSheet = RES.getRes(sheetName);
    var texture: egret.Texture = sheet.getTexture(name);
    var result: egret.Bitmap = new egret.Bitmap();
    result.texture = texture;
    return result;
}

function getTextureFromSheet(name: string, sheetName: string = "gameRes"): egret.Texture {
    var sheet: egret.SpriteSheet = RES.getRes(sheetName);
    var result: egret.Texture = sheet.getTexture(name);
    return result;
}