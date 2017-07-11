var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 可覆盖瓦片
 */
var TileCover = (function () {
    function TileCover() {
    }
    TileCover.addTopLayer = function (tile, col, row) {
        TileCover.topLayerList[col + '_' + row] = tile;
    };
    TileCover.addRoleLayer = function (tile, col, row) {
        TileCover.roleLayerList[col + '_' + row] = tile;
    };
    TileCover.add = function (tile, col, row, level) {
        if (level == MapDecorationEnum.FLOOR) {
            TileCover.addRoleLayer(tile, col, row);
        }
        else if (level == MapDecorationEnum.TOP) {
            TileCover.addTopLayer(tile, col, row);
        }
    };
    TileCover.addAllToLayer = function () {
        var layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_TOP);
        for (var key in TileCover.topLayerList) {
            layer.addChild(TileCover.topLayerList[key]);
        }
        layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_ROLE);
        for (var key in TileCover.roleLayerList) {
            layer.addChild(TileCover.roleLayerList[key]);
        }
    };
    return TileCover;
}());
__reflect(TileCover.prototype, "TileCover");
//# sourceMappingURL=TileCover.js.map