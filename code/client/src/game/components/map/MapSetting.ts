class MapSetting {

    /** 地图文件目录 URL */
    public static MAP_URL: string = "resource/assets/map/";

    /**
     * 瓦片缩放
     */
    public static TILE_SCALE: number = 1;

    /****************************游戏地图层次类型*********************************/

    //地形层
    public static TERRAIN_LAYER: number = 1;
    //物品层
    public static ARTICLE_LAYER: number = 2;
    //出生层
    public static BIRTH_LAYER: number = 3;
    //装饰层
    public static DECORATION_LAYER: number = 4;
    //背景层
    public static BG_LAYER: number = 5;
}