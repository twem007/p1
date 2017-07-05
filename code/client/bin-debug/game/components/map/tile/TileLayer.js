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
        _this._tileWidth = 0;
        _this._tileHeight = 0;
        _this._tileCol = 0;
        _this._tileRow = 0;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    TileLayer.prototype.init = function (mapId, tileCol, tileRow, tileWidth, tileHeight) {
        var configs = Config.getConfig(MapCfgConfig);
        this.config = configs.get(mapId);
        this._mapId = mapId;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;
        this._tileCol = tileCol;
        this._tileRow = tileRow;
        //因使用cacheAsBitmap会导致地图撕裂，随意要比原来的缩放大
        this._tileScale = this._tileWidth / (this._tileWidth - 1);
        if (!this._tileList) {
            this._tileList = {};
        }
        TileCover.topLayerList = {};
        TileCover.roleLayerList = {};
    };
    TileLayer.prototype.create = function (layerType) {
        if (layerType == MapSetting.BG_LAYER) {
            this.createBg();
        }
        else if (layerType == MapSetting.DECORATION_LAYER) {
            var layerConfig = MapCellData.getMapLayerData(MapSetting.DECORATION_LAYER);
            this.createLayer(this.getTileData(layerConfig['data']), layerConfig['properties']['type']);
        }
    };
    TileLayer.prototype.createBg = function () {
        if (!this._bg1) {
            this._bg1 = new egret.Bitmap();
        }
        var key = this.config.bgRes + '_1_jpg';
        this._bg1.bitmapData = RES.getRes(key);
        this.addChild(this._bg1);
        if (!this._bg2) {
            this._bg2 = new egret.Bitmap();
            this._bg2.x = this._tileWidth * this._tileCol * 0.5;
        }
        this._bg2.bitmapData = RES.getRes(this.config.bgRes + '_2_jpg');
        this.addChild(this._bg2);
    };
    TileLayer.prototype.createLayer = function (tileArr, layerType) {
        var num;
        for (var i = 0; i < this._tileRow; i++) {
            for (var j = 0; j < this._tileCol; j++) {
                num = tileArr[i][j];
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
        var tile = this._tileList[layerType + '_' + col + "_" + row];
        if (!tile) {
            tile = new TileObject();
            tile.x = col * this._tileWidth;
            tile.y = row * this._tileHeight;
            tile.col = col;
            tile.row = row;
            this._tileList[layerType + '_' + col + "_" + row] = tile;
        }
        tile.texture = texture;
        tile.layerType = parseInt(layerType);
        tile.scaleX = tile.scaleY = this._tileScale;
        if (!tile.parent) {
            if (tile.layerType == MapSetting.DECORATION_LAYER) {
                TileCover.add(tile, col, row, imgNum);
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
        return this.config['img'] + "_" + name;
    };
    /**
     * 获取瓦片数据，转为二位数组
     * @arr 瓦片配置数据
     */
    TileLayer.prototype.getTileData = function (arr) {
        var tileArr = [];
        var tileRowArr = [];
        var tileArrLen = arr.length;
        for (var i = 0; i < tileArrLen; i++) {
            tileRowArr.push(arr[i]);
            if ((i + 1) % this._tileCol === 0) {
                tileArr.push(tileRowArr);
                tileRowArr = [];
            }
        }
        return tileArr;
    };
    TileLayer.prototype.getTile = function (col, row) {
        if (this._tileList[MapSetting.DECORATION_LAYER + '_' + col + "_" + row]) {
            return this._tileList[MapSetting.DECORATION_LAYER + '_' + col + "_" + row];
        }
        return;
    };
    Object.defineProperty(TileLayer.prototype, "mapId", {
        get: function () {
            return this._mapId;
        },
        enumerable: true,
        configurable: true
    });
    TileLayer.prototype.destroyAllTile = function () {
        var tile;
        for (var key in this._tileList) {
            tile = this._tileList[key];
            if (tile.parent) {
                tile.parent.removeChild(tile);
            }
            delete this._tileList[key];
        }
    };
    TileLayer.prototype.destroy = function () {
        this.destroyAllTile();
        this._tileList = null;
    };
    return TileLayer;
}(egret.DisplayObjectContainer));
__reflect(TileLayer.prototype, "TileLayer");
