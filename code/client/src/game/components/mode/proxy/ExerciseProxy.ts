class ExerciseProxy {

    private static s_instance: ExerciseProxy;

    private m_data: ExerciseModeData;

    constructor() {
        let data: ExerciseModeData = new ExerciseModeData();
        data.mapID = 101;
        data.player = this.creatPlayer();
        this.m_data = data;
    }

    public getData(): ExerciseModeData {
        return this.m_data;
    }

    /**
     * 创建主控玩家
     */
    private creatPlayer(): PlayerData {
        let data: PlayerData = new PlayerData();
        return data;
    }
    /**
     * 创建机器人
     */
    private creatRobot(robotCount: number): RoleData[] {
        return null;
    }
    /**
     * 创建箱子
     */
    private createBox(): void {
        let data: MapData = new MapData();
        data.update(this.m_data.mapID);
        let tileArr: number[] = data.getLayerData(MapLayerEnum.GOODS).data;
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