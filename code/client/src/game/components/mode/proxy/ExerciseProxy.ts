class ExerciseProxy {

    private static s_instance: ExerciseProxy;

    private m_data: ExerciseModeData;

    constructor() {
        this.m_data = new ExerciseModeData();
    }

    public getData(): ExerciseModeData {
        return this.m_data;
    }
    
    public createMapData(id:number): MapData {
        let map: MapData = new MapData();
        map.update(id);
        this.m_data.map = map;
        this.m_data.goods = [];
        this.m_data.roles = [];
        return map;
    }

    /**
     * 创建主控玩家
     */
    public creatPlayerData(): PlayerData {
        let data: PlayerData = new PlayerData();
        return data;
    }
    /**
     * 创建机器人
     */
    public creatRobotData(robotCount: number): RoleData[] {
        return null;
    }
    /**
     * 创建箱子
     */
    public createBoxData(): void {
        let data: MapData = this.m_data.map;
        let layer:MapLayerData = data.getLayerData(MapLayerEnum.GOODS);
        let tileArr: number[] = layer.data;
        for (let i = 0, iLen: number = tileArr.length; i < iLen; i++) {
            let num: number = tileArr[i];
            if (num != 0) {
                let col: number = i % data.cols;
                let row: number = i / data.cols << 0;
                let attr: any = data.getTileData(MapTileEnum.BG).getTileProp(num);
                var type: GoodsTypeEnum = attr.can_move == 1 ? GoodsTypeEnum.MOVE_BOX : GoodsTypeEnum.STATIC_BOX;
                let boxData = new BattleBoxData();
                boxData.row = row;
                boxData.col = col;
                this.m_data.goods.push(boxData);
            }
        }
    }

    public static instance(): ExerciseProxy {
        if (!ExerciseProxy.s_instance) {
            ExerciseProxy.s_instance = new ExerciseProxy();
        }
        return ExerciseProxy.s_instance;
    }
}