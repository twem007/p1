var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MapData = (function (_super) {
    __extends(MapData, _super);
    function MapData() {
        var _this = _super.call(this) || this;
        _this.tilesets = [];
        _this.layers = [];
        return _this;
    }
    MapData.prototype.update = function (id) {
        this.reset();
        this.id = id;
        var configs = Config.getConfig(MapCfgConfig);
        this.config = configs.get(id);
        var config = RES.getRes(this.config.mapData + "_json");
        if (config) {
            this.cols = config.width;
            this.rows = config.height;
            this.tileWidth = config.tilewidth;
            this.tileHeight = config.tileheight;
            this.mapWidth = this.tileWidth * this.cols;
            this.mapHeight = this.tileHeight * this.rows;
            var tilesets = config.tilesets;
            if (tilesets) {
                for (var i = 0, iLen = tilesets.length; i < iLen; i++) {
                    var tileset = tilesets[i];
                    if (tileset) {
                        this.tilesets.push(new MapTilesetData(tileset));
                    }
                }
            }
            var layers = config.layers;
            if (layers) {
                for (var i = 0, iLen = layers.length; i < iLen; i++) {
                    var layer = layers[i];
                    if (layer) {
                        this.layers.push(new MapLayerData(layer));
                    }
                }
            }
        }
        else {
            Log("\u5730\u56FE\u914D\u7F6E" + this.config.mapData + "_json\u4E0D\u5B58\u5728");
        }
    };
    MapData.prototype.getBirthCell = function (teamID) {
        var layer = this.getLayerData(MapLayerEnum.BIRTH);
        var tileset = this.getTileData(3);
        if (layer) {
            var datas = layer.data;
            if (datas) {
                for (var i = 0, iLen = datas.length; i < iLen; i++) {
                }
            }
            return null;
        }
    };
    /**
     * 得到地图层数据
     */
    MapData.prototype.getLayerData = function (type) {
        var layers = this.layers;
        for (var i = 0, iLen = layers.length; i < iLen; i++) {
            var layer = layers[i];
            if (layer.properties.type === type) {
                return layer;
            }
        }
        return null;
    };
    /**
     * 得到地图块数据
     */
    MapData.prototype.getTileData = function (type) {
        var tilesets = this.tilesets;
        for (var i = 0, iLen = tilesets.length; i < iLen; i++) {
            var tileset = tilesets[i];
            if (tileset.properties.pic_type === type)
                return tileset;
        }
        return null;
    };
    MapData.prototype.reset = function () {
        this.layers.length = 0;
        this.tilesets.length = 0;
    };
    MapData.prototype.clone = function () {
        var data = new MapData();
        return data;
    };
    return MapData;
}(BaseData));
__reflect(MapData.prototype, "MapData");
//# sourceMappingURL=MapData.js.map