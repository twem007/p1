var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 地图分块层实现
 */
var TileLayer = (function (_super) {
    __extends(TileLayer, _super);
    function TileLayer() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    TileLayer.prototype.init = function (data) {
        this.m_data = data;
        //因使用cacheAsBitmap会导致地图撕裂，随意要比原来的缩放大
        this.m_tileScale = this.m_data.tileWidth / (this.m_data.tileWidth - 1);
        if (!this.m_tileList) {
            this.m_tileList = {};
        }
        TileCover.topLayerList = {};
        TileCover.roleLayerList = {};
    };
    TileLayer.prototype.create = function (layerType) {
        if (layerType == MapSetting.BG_LAYER) {
            this.createBg();
        }
        else if (layerType == MapSetting.DECORATION_LAYER) {
            var layerData = this.m_data.getLayerData(MapLayerEnum.DECORATION);
            if (layerData) {
                this.createLayer(Utils.arrToArr2(layerData.data, this.m_data.cols), layerData.properties.type);
            }
        }
    };
    TileLayer.prototype.createBg = function () {
        if (!this.m_bg1) {
            this.m_bg1 = new egret.Bitmap();
        }
        this.m_bg1.bitmapData = RES.getRes(this.m_data.config.bgRes + "_1_jpg");
        this.addChild(this.m_bg1);
        if (!this.m_bg2) {
            this.m_bg2 = new egret.Bitmap();
            this.m_bg2.x = this.m_data.tileWidth * this.m_data.cols * 0.5;
        }
        this.m_bg2.bitmapData = RES.getRes(this.m_data.config.bgRes + "_2_jpg");
        this.addChild(this.m_bg2);
    };
    TileLayer.prototype.createLayer = function (tileArr, layerType) {
        for (var i = 0, iLen = this.m_data.rows; i < iLen; i++) {
            for (var j = 0, jLen = this.m_data.cols; j < jLen; j++) {
                var num = tileArr[i][j];
                if (num > 0) {
                    this.createTile(j, i, num, layerType);
                }
            }
        }
    };
    /**
     *  创建瓦片
     * @param col
     * @param row
     * @param imgNum
     * @param layerType 层类型
     */
    TileLayer.prototype.createTile = function (col, row, imgNum, layerType) {
        var texture = RES.getRes(this.getTileImgName(imgNum - 1));
        var tile = this.m_tileList[layerType + '_' + col + "_" + row];
        if (!tile) {
            tile = new TileObject();
            tile.x = col * this.m_data.tileWidth;
            tile.y = row * this.m_data.tileHeight;
            tile.col = col;
            tile.row = row;
            this.m_tileList[layerType + '_' + col + "_" + row] = tile;
        }
        tile.texture = texture;
        tile.layerType = parseInt(layerType);
        tile.scaleX = tile.scaleY = this.m_tileScale;
        if (!tile.parent) {
            if (tile.layerType == MapSetting.DECORATION_LAYER) {
                var tileset = this.m_data.getTileData(MapTileEnum.BG);
                if (tileset) {
                    TileCover.add(tile, col, row, tileset.getTileProp(imgNum));
                }
            }
        }
    };
    /**
     * 获取瓦片资源名
     * @num 图片名
     */
    TileLayer.prototype.getTileImgName = function (num) {
        var name = num.toString();
        if (name.length === 1) {
            name = "00" + name;
        }
        else if (name.length === 2) {
            name = "0" + name;
        }
        return this.m_data.config.mapRes + "_" + name;
    };
    TileLayer.prototype.getTile = function (col, row) {
        if (this.m_tileList[MapSetting.DECORATION_LAYER + '_' + col + "_" + row]) {
            return this.m_tileList[MapSetting.DECORATION_LAYER + '_' + col + "_" + row];
        }
        return;
    };
    TileLayer.prototype.destroyAllTile = function () {
        var tile;
        for (var key in this.m_tileList) {
            tile = this.m_tileList[key];
            if (tile.parent) {
                tile.parent.removeChild(tile);
            }
            delete this.m_tileList[key];
        }
    };
    TileLayer.prototype.destroy = function () {
        this.destroyAllTile();
        this.m_tileList = null;
    };
    return TileLayer;
}(core.Layer));
__reflect(TileLayer.prototype, "TileLayer");
//# sourceMappingURL=TileLayer.js.map