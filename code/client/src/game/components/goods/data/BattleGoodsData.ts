class BattleGoodsData extends GoodsData {
    /**
     * 地图内X坐标
     */
    public x:number;
    /**
     * 地图内Y坐标
     */
    public y:number;
    /**
     * 地图网格Y坐标
     */
    public row:number;
    /**
     * 地图网格X坐标
     */
    public col:number;
    /**
     * 静态配置ID
     */
    public sid: number;
    /**
     * 静态配置
     */
    public config: BombMapItemConfig;
}