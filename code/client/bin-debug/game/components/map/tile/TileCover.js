var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by WZW on 2017/6/7.
 * 可覆盖瓦片
 */
var MapDecoration;
(function (MapDecoration) {
    MapDecoration[MapDecoration["FLOOR"] = 1] = "FLOOR";
    MapDecoration[MapDecoration["TOP"] = 2] = "TOP";
})(MapDecoration || (MapDecoration = {}));
var TileCover = (function () {
    function TileCover() {
    }
    TileCover.addTopLayer = function (tile, col, row) {
        TileCover.topLayerList[col + '_' + row] = tile;
    };
    TileCover.addRoleLayer = function (tile, col, row) {
        TileCover.roleLayerList[col + '_' + row] = tile;
    };
    TileCover.add = function (tile, col, row, imgNum) {
        var attr = MapCellData.getBgAttr(imgNum);
        if (attr) {
            if (attr['level'] == MapDecoration.FLOOR) {
                TileCover.addRoleLayer(tile, col, row);
            }
            else if (attr['level'] == MapDecoration.TOP) {
                TileCover.addTopLayer(tile, col, row);
            }
        }
    };
    TileCover.addAllToLayer = function (map) {
        for (var key in TileCover.topLayerList) {
            map.topLayer.addChild(TileCover.topLayerList[key]);
        }
        for (var key in TileCover.roleLayerList) {
            map.roleLayer.addChild(TileCover.roleLayerList[key]);
        }
    };
    return TileCover;
}());
__reflect(TileCover.prototype, "TileCover");
