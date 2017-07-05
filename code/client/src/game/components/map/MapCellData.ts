/**
 * Created by WZW on 2017/5/3.
 * 地图数据
 */
class MapCellData {

    public static currentMapId: number;
    //原始数据
    public static mapOriginalData: any;
    //地图路径层数据
    public static mapWayArr: Array<any>;
    //地图可行走网格数据
    public static mapWalkArr: Array<egret.Point>;
    //背景层图块的数据
    public static bgLayerImageData: Object;
    //道具层图块的数据
    public static propLayerImageData: Object;
    //地形层图块的数据
    public static terrainLayerImageData: Object;
    //出生点层图块的数据
    public static birthLayerImageData: Object;
    //出生网格
    public static birthCellData: Object;

    /**
     * 获取出生点
     * @returns {Object}
     */
    public static getBirthCell() {
        if (MapCellData.birthCellData) {
            return MapCellData.birthCellData;
        }
        MapCellData.birthCellData = {};
        var arr: Array<any> = MapCellData.getMapLayerData(MapSetting.BIRTH_LAYER)['data'];
        var len: number = arr.length;
        for (var i: number = 0; i < len; i++) {
            var col: number = i % MapCellData.mapOriginalData['width'];
            var row: number = (i - col) / MapCellData.mapOriginalData['width'];
            var num: number = arr[i];
            if (num > 0) {
                var attr: Object = MapCellData.getBirthAttr(num);
                var birthCell: Array<any> = MapCellData.birthCellData[attr['teamId']];
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
    }

    /**
     * 获取图层数据
     * @param layerType 层类型
     * @returns {Object}
     */
    public static getMapLayerData(layerType: number): Object {
        var layersArr: Array<any> = MapCellData.mapOriginalData['layers'];
        var layerLen: number = layersArr.length;
        var layerData: Object;
        for (var i: number = 0; i < layerLen; i++) {
            layerData = layersArr[i];
            if (layerData["properties"]["type"] == layerType) {
                return layerData;
            }
        }
        return;
    }

    /**
     * 获取道具图层数据
     * @returns {Object}
     */
    public static getPropLayerData(): Array<any> {
        var layersArr: Array<any> = MapCellData.mapOriginalData['layers'];
        var layerLen: number = layersArr.length;
        var layerData: Object;
        var arr: Array<any> = [];
        for (var i: number = 0; i < layerLen; i++) {
            layerData = layersArr[i];
            //获取地形层数据
            if (layerData["properties"]["type"] >= 100) {
                arr.push(layerData);
            }
        }
        return arr;
    }

    /**
     * 获取层图块的数据
     * @param type
     * @returns {Object}
     */
    public static getLayerImageData(type: number) {
        var arr: Array<any> = MapCellData.mapOriginalData['tilesets'];
        var len: number = arr.length;
        for (var i = 0; i < len; i++) {
            var tileData: Object = arr[i];
            if (tileData['properties'] && tileData['properties']['pic_type'] == type) {
                return tileData;
            }
        }
        return;
    }

    /**
     * 获取出生层图块属性
     * @param id 图块id
     * @returns {any}
     */
    public static getBirthAttr(id: number): Object {
        if (!MapCellData.birthLayerImageData) {
            MapCellData.birthLayerImageData = this.getLayerImageData(LayerImage.BIRTH);
        }
        var tileData: Object = MapCellData.birthLayerImageData;
        var tileAttr: Object = tileData['tileproperties'];
        var firstgid: number = tileData['firstgid'];
        return tileAttr[id - firstgid];
    }

    /**
     * 获取地形层图块属性
     * @param id 图块id
     * @returns {any}
     */
    public static getTerrainAttr(id: number): Object {
        if (!MapCellData.terrainLayerImageData) {
            MapCellData.terrainLayerImageData = this.getLayerImageData(LayerImage.TERRAIN);
        }
        var tileData: Object = MapCellData.terrainLayerImageData;
        var tileAttr: Object = tileData['tileproperties'];
        var firstgid: number = tileData['firstgid'];
        return tileAttr[id - firstgid];
    }

    /**
     * 获取背景层图块属性
     * @param id 图块id
     * @returns {any}
     */
    public static getBgAttr(id: number): Object {
        if (!MapCellData.bgLayerImageData) {
            MapCellData.bgLayerImageData = this.getLayerImageData(LayerImage.BG);
        }
        var tileData: Object = MapCellData.bgLayerImageData;
        var tileAttr: Object = tileData['tileproperties'];
        var firstgid: number = tileData['firstgid'];
        return tileAttr[id - firstgid];
    }

    /**
     * 获取道具层图块属性
     * @param id 图块id
     * @returns {any}
     */
    public static getPropAttr(id: number): Object {
        if (!MapCellData.propLayerImageData) {
            MapCellData.propLayerImageData = this.getLayerImageData(LayerImage.PROP);
        }
        var tileData: Object = MapCellData.propLayerImageData;
        var tileAttr: Object = tileData['tileproperties'];
        var firstgid: number = tileData['firstgid'];
        return tileAttr[id - firstgid];
    }

    /**
     * 获取地图可行走网格数据
     * @param layerXml
     * @return
     */
    public static getMapWalkData(): Array<egret.Point> {
        if (MapCellData.mapWalkArr) {
            return MapCellData.mapWalkArr;
        }

        MapCellData.mapWalkArr = [];
        var mapWayArr: Array<any> = MapCellData.getMapWayData();
        var rowLen: number = mapWayArr.length;
        for (var row: number = 0; row < rowLen; row++) {
            var rowArr: Array<any> = mapWayArr[row];
            var colLen: number = mapWayArr.length;
            for (var col: number = 0; col < colLen; col++) {
                var num: number = rowArr[col];
                if (num === 0) {
                    MapCellData.mapWalkArr.push(egret.Point.create(col, row));
                }
            }
        }
        return MapCellData.mapWalkArr;
    }

    /**
     * 获取地图路径数据
     * @param layerXml
     * @return
     */
    public static getMapWayData(): Array<any> {
        if (MapCellData.mapWayArr) {
            return MapCellData.mapWayArr;
        }

        var wayArr: Array<any> = MapCellData.getMapLayerData(MapSetting.TERRAIN_LAYER)['data'];
        //转成二位数组
        MapCellData.mapWayArr = [];
        var wayRowArr: Array<number> = [];
        var wayDataLen: number = wayArr.length;

        for (var i: number = 0; i < wayDataLen; i++) {
            wayRowArr.push(wayArr[i]);
            if ((i + 1) % MapCellData.mapOriginalData['width'] === 0) {
                MapCellData.mapWayArr.push(wayRowArr);
                wayRowArr = [];
            }
        }

        return MapCellData.mapWayArr;
    }

    /**
     * 判断指定格子是否是路
     * @param col
     * @param row
     * @returns {boolean}
     */
    public static checkWay(col: number, row: number): boolean {
        let r = MapCellData.mapWayArr[row];
        if (r && r[col] === 0) {
            return true;
        }
        return false;
    }

    public static clear() {
        MapCellData.mapWayArr = null;
        MapCellData.mapWalkArr = null;
        MapCellData.bgLayerImageData = null;
        MapCellData.propLayerImageData = null;
        MapCellData.birthCellData = null;
        MapCellData.birthLayerImageData = null;
        MapCellData.terrainLayerImageData = null;
    }
}


