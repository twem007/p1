var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by WZW on 2017/5/3.
 * 道具箱
 */
var BoxProp = (function (_super) {
    __extends(BoxProp, _super);
    function BoxProp(data) {
        var _this = _super.call(this, data) || this;
        _this.scaleX = _this.scaleY = 1.435;
        return _this;
    }
    /**
     * 播放生效效果
     */
    BoxProp.prototype.showEffect = function () {
        if (!this.parent) {
            return;
        }
        // super.showEffect();
        this.setBitmap(this.getTileImgName());
    };
    /**
     * 获取瓦片资源名
     * @num 图片名
     */
    BoxProp.prototype.getTileImgName = function () {
        // var name: string = num.toString();
        var tileArr = []; //MapCellData.getMapLayerData(MapSetting.ARTICLE_LAYER)['data'];
        var cellCol = 30; //MapManager.getInstance().map.cellCol;
        var num = tileArr[this.data.row * cellCol + this.data.col];
        var name = (num - 1).toString();
        if (name.length === 1) {
            name = "00" + name;
        }
        else if (name.length === 2) {
            name = "0" + name;
        }
        var mapId = 101; //MapManager.getInstance().mapId;
        return ""; //MapManager.getInstance().mapResData[mapId]['img']+ "_" + name;
    };
    BoxProp.getCacheName = function () {
        if (!BoxProp._cacheName) {
            BoxProp._cacheName = egret.getQualifiedClassName(this);
        }
        return BoxProp._cacheName;
    };
    /**
         * 设置贴图
         * @param imgName 贴图资源名，如果传null就清掉并移除贴图
         */
    BoxProp.prototype.setBitmap = function (imgName) {
        if (!this._bitmap) {
            this._bitmap = new egret.Bitmap();
        }
        if (!imgName) {
            this._bitmap.texture = null;
            if (this._bitmap.parent) {
                this.removeChild(this._bitmap);
            }
            return;
        }
        if (this._imgName !== imgName) {
            this._bitmap.texture = RES.getRes(imgName);
            this._imgName = imgName;
            this._bitmap.anchorOffsetX = this._bitmap.texture.textureWidth >> 1;
            this._bitmap.anchorOffsetY = this._bitmap.texture.textureHeight >> 1;
            if (!this._bitmap.parent) {
                this.addChild(this._bitmap);
            }
        }
    };
    return BoxProp;
}(BaseProp));
__reflect(BoxProp.prototype, "BoxProp");
//# sourceMappingURL=BoxProp.js.map