var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapSetting = (function () {
    function MapSetting() {
    }
    return MapSetting;
}());
/** 地图文件目录 URL */
MapSetting.MAP_URL = "resource/assets/map/";
/**
 * 瓦片缩放
 */
MapSetting.TILE_SCALE = 1;
/****************************游戏地图层次类型*********************************/
//地形层
MapSetting.TERRAIN_LAYER = 1;
//物品层
MapSetting.ARTICLE_LAYER = 2;
//出生层
MapSetting.BIRTH_LAYER = 3;
//装饰层
MapSetting.DECORATION_LAYER = 4;
//背景层
MapSetting.BG_LAYER = 5;
__reflect(MapSetting.prototype, "MapSetting");
