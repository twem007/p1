var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by WZW on 2017/5/3.
 * 地图数据
 */
var MapCellData = (function () {
    function MapCellData() {
    }
    /**
     * 获取出生点
     * @returns {Object}
     */
    MapCellData.getBirthCell = function () {
        if (MapCellData.birthCellData) {
            return MapCellData.birthCellData;
        }
        MapCellData.birthCellData = {};
        var arr = MapCellData.getMapLayerData(MapSetting.BIRTH_LAYER)['data'];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var col = i % MapCellData.mapOriginalData['width'];
            var row = (i - col) / MapCellData.mapOriginalData['width'];
            var num = arr[i];
            if (num > 0) {
                var attr = MapCellData.getBirthAttr(num);
                var birthCell = MapCellData.birthCellData[attr['teamId']];
                if (birthCell) {
                    MapCellData.birthCellData[attr['teamId']].push(new egret.Point(col, row));
                }
                else {
                    birthCell = [new egret.Point(col, row)];
                    MapCellData.birthCellData[attr['teamId']] = birthCell;
                }
            }
        }
        return MapCellData.birthCellData;
    };
    /**
     * 获取图层数据
     * @param layerType 层类型
     * @returns {Object}
     */
    MapCellData.getMapLayerData = function (layerType) {
        var layersArr = MapCellData.mapOriginalData['layers'];
        var layerLen = layersArr.length;
        var layerData;
        for (var i = 0; i < layerLen; i++) {
            layerData = layersArr[i];
            if (layerData["properties"]["type"] == layerType) {
                return layerData;
            }
        }
        return;
    };
    /**
     * 获取道具图层数据
     * @returns {Object}
     */
    MapCellData.getPropLayerData = function () {
        var layersArr = MapCellData.mapOriginalData['layers'];
        var layerLen = layersArr.length;
        var layerData;
        var arr = [];
        for (var i = 0; i < layerLen; i++) {
            layerData = layersArr[i];
            //获取地形层数据
            if (layerData["properties"]["type"] >= 100) {
                arr.push(layerData);
            }
        }
        return arr;
    };
    /**
     * 获取层图块的数据
     * @param type
     * @returns {Object}
     */
    MapCellData.getLayerImageData = function (type) {
        var arr = MapCellData.mapOriginalData['tilesets'];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var tileData = arr[i];
            if (tileData['properties'] && tileData['properties']['pic_type'] == type) {
                return tileData;
            }
        }
        return;
    };
    /**
     * 获取出生层图块属性
     * @param id 图块id
     * @returns {any}
     */
    MapCellData.getBirthAttr = function (id) {
        if (!MapCellData.birthLayerImageData) {
            MapCellData.birthLayerImageData = this.getLayerImageData(LayerImage.BIRTH);
        }
        var tileData = MapCellData.birthLayerImageData;
        var tileAttr = tileData['tileproperties'];
        var firstgid = tileData['firstgid'];
        return tileAttr[id - firstgid];
    };
    /**
     * 获取地形层图块属性
     * @param id 图块id
     * @returns {any}
     */
    MapCellData.getTerrainAttr = function (id) {
        if (!MapCellData.terrainLayerImageData) {
            MapCellData.terrainLayerImageData = this.getLayerImageData(LayerImage.TERRAIN);
        }
        var tileData = MapCellData.terrainLayerImageData;
        var tileAttr = tileData['tileproperties'];
        var firstgid = tileData['firstgid'];
        return tileAttr[id - firstgid];
    };
    /**
     * 获取背景层图块属性
     * @param id 图块id
     * @returns {any}
     */
    MapCellData.getBgAttr = function (id) {
        if (!MapCellData.bgLayerImageData) {
            MapCellData.bgLayerImageData = this.getLayerImageData(LayerImage.BG);
        }
        var tileData = MapCellData.bgLayerImageData;
        var tileAttr = tileData['tileproperties'];
        var firstgid = tileData['firstgid'];
        return tileAttr[id - firstgid];
    };
    /**
     * 获取道具层图块属性
     * @param id 图块id
     * @returns {any}
     */
    MapCellData.getPropAttr = function (id) {
        if (!MapCellData.propLayerImageData) {
            MapCellData.propLayerImageData = this.getLayerImageData(LayerImage.PROP);
        }
        var tileData = MapCellData.propLayerImageData;
        var tileAttr = tileData['tileproperties'];
        var firstgid = tileData['firstgid'];
        return tileAttr[id - firstgid];
    };
    /**
     * 获取地图可行走网格数据
     * @param layerXml
     * @return
     */
    MapCellData.getMapWalkData = function () {
        if (MapCellData.mapWalkArr) {
            return MapCellData.mapWalkArr;
        }
        MapCellData.mapWalkArr = [];
        var mapWayArr = MapCellData.getMapWayData();
        var rowLen = mapWayArr.length;
        for (var row = 0; row < rowLen; row++) {
            var rowArr = mapWayArr[row];
            var colLen = mapWayArr.length;
            for (var col = 0; col < colLen; col++) {
                var num = rowArr[col];
                if (num === 0) {
                    MapCellData.mapWalkArr.push(egret.Point.create(col, row));
                }
            }
        }
        return MapCellData.mapWalkArr;
    };
    /**
     * 获取地图路径数据
     * @param layerXml
     * @return
     */
    MapCellData.getMapWayData = function () {
        if (MapCellData.mapWayArr) {
            return MapCellData.mapWayArr;
        }
        var wayArr = MapCellData.getMapLayerData(MapSetting.TERRAIN_LAYER)['data'];
        //转成二位数组
        MapCellData.mapWayArr = [];
        var wayRowArr = [];
        var wayDataLen = wayArr.length;
        for (var i = 0; i < wayDataLen; i++) {
            wayRowArr.push(wayArr[i]);
            if ((i + 1) % MapCellData.mapOriginalData['width'] === 0) {
                MapCellData.mapWayArr.push(wayRowArr);
                wayRowArr = [];
            }
        }
        return MapCellData.mapWayArr;
    };
    /**
     * 判断指定格子是否是路
     * @param col
     * @param row
     * @returns {boolean}
     */
    MapCellData.checkWay = function (col, row) {
        var r = MapCellData.mapWayArr[row];
        if (r && r[col] === 0) {
            return true;
        }
        return false;
    };
    MapCellData.clear = function () {
        MapCellData.mapWayArr = null;
        MapCellData.mapWalkArr = null;
        MapCellData.bgLayerImageData = null;
        MapCellData.propLayerImageData = null;
        MapCellData.birthCellData = null;
        MapCellData.birthLayerImageData = null;
        MapCellData.terrainLayerImageData = null;
    };
    return MapCellData;
}());
__reflect(MapCellData.prototype, "MapCellData");
