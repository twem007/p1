class MapData extends BaseData {
    //地图配置
    public config: MapCfgConfig;
    //宽
    public cols: number;
    //高
    public rows: number;
    //网格宽
    public tileWidth: number;
    //网格高
    public tileHeight: number;
    //瓦片数据
    public tilesets: MapTilesetData[];
    //层数据
    public layers: MapLayerData[];
    //地图宽度
    public mapWidth: number;
    //地图高度
    public mapHeight: number;

    constructor() {
        super();
        this.tilesets = [];
        this.layers = [];
    }

    public update(id: number): void {
        this.reset();
        let configs: Dictionary<MapCfgConfig> = Config.getConfig(MapCfgConfig);
        this.config = configs.get(id);
        let config: any = RES.getRes(`${this.config.mapData}_json`);
        if (config) {
            this.cols = config.width;
            this.rows = config.height;
            this.tileWidth = config.tilewidth;
            this.tileHeight = config.tileheight;
            this.mapWidth = this.tileWidth * this.cols;
            this.mapHeight = this.tileHeight * this.rows;
            let tilesets: any[] = config.tilesets;
            if (tilesets) {
                for (let i: number = 0, iLen: number = tilesets.length; i < iLen; i++) {
                    let tileset: any = tilesets[i];
                    if (tileset) {
                        this.tilesets.push(new MapTilesetData(tileset));
                    }
                }
            }
            let layers: any[] = config.layers;
            if (layers) {
                for (let i: number = 0, iLen: number = layers.length; i < iLen; i++) {
                    let layer: any = layers[i];
                    if (layer) {
                        this.layers.push(new MapLayerData(layer));
                    }
                }
            }
        } else {
            Log(`地图配置${this.config.mapData}_json不存在`);
        }
    }

    public getBirthCell(teamID: number): egret.Point[] {
        let layer: MapLayerData = this.getLayerData(MapLayerEnum.BIRTH);
        let tileset: MapTilesetData = this.getTileData(3);
        if (layer) {
            let datas: number[] = layer.data;
            if (datas) {
                for (let i: number = 0, iLen: number = datas.length; i < iLen; i++) {
                }
            }
            return null;
        }
    }
    /**
     * 得到地图层数据
     */
    public getLayerData(type: number): MapLayerData {
        let layers: MapLayerData[] = this.layers;
        for (let i: number = 0, iLen: number = layers.length; i < iLen; i++) {
            let layer: MapLayerData = layers[i];
            if (layer.properties.type === type) {
                return layer;
            }
        }
        return null;
    }
    /**
     * 得到地图块数据
     */
    public getTileData(type: number): MapTilesetData {
        let tilesets: MapTilesetData[] = this.tilesets;
        for (let i: number = 0, iLen: number = tilesets.length; i < iLen; i++) {
            let tileset: MapTilesetData = tilesets[i];
            if (tileset.properties.pic_type === type)
                return tileset;
        }
        return null;
    }

    public reset(): void {
        this.layers.length = 0;
        this.tilesets.length = 0;
    }

    public clone(): MapData {
        let data: MapData = new MapData();
        return data;
    }
}