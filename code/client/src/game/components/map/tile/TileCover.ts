/**
 * 可覆盖瓦片
 */
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

    public static add(tile: TileObject, col: number, row: number, level: number): void {
        if (level == MapDecorationEnum.FLOOR) {
            TileCover.addRoleLayer(tile, col, row);
        }
        else if (level == MapDecorationEnum.TOP) {
            TileCover.addTopLayer(tile, col, row);
        }
    }

    public static addAllToLayer(): void {
        let layer: core.Layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_TOP);
        for (let key in TileCover.topLayerList) {
            layer.addChild(TileCover.topLayerList[key]);
        }
        layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_ROLE);
        for (let key in TileCover.roleLayerList) {
            layer.addChild(TileCover.roleLayerList[key]);
        }
    }
}