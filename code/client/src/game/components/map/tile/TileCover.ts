/**
 * Created by WZW on 2017/6/7.
 * 可覆盖瓦片
 */
enum MapDecoration {
    FLOOR = 1,
    TOP = 2
}

class TileCover {

    //顶层瓦
    public static topLayerList: Object;
    //角色层瓦
    public static roleLayerList: Object;
 
    public static addTopLayer(tile: TileObject, col: number, row: number): void {
        TileCover.topLayerList[col + '_' + row] = tile;
    }

    public static addRoleLayer(tile: TileObject, col: number, row: number): void {
        TileCover.roleLayerList[col + '_' + row] = tile;
    }

    public static add(tile: TileObject, col: number, row: number, imgNum: number): void {
        var attr: Object = MapCellData.getBgAttr(imgNum);
        if (attr) { 
            if (attr['level'] == MapDecoration.FLOOR) {
                TileCover.addRoleLayer(tile, col, row);
            }
            else if (attr['level'] == MapDecoration.TOP) {
                TileCover.addTopLayer(tile, col, row);
            }
        }
    }

    public static addAllToLayer(map: Map): void {
        for (var key in TileCover.topLayerList) {
            map.topLayer.addChild(TileCover.topLayerList[key]);
        }

        for (var key in TileCover.roleLayerList) {
            map.roleLayer.addChild(TileCover.roleLayerList[key]);
        }
    }
}