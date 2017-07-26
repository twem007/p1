class GameController extends core.Control {

    constructor() {
        super(ModuleEnum.GAME);
    }

    public getLoadGroup(data?: any): string[] {
        let configs: Dictionary<MapCfgConfig> = Config.getConfig(MapCfgConfig);
        let mapIDArr: Array<any> = [101, 102, 103];
        let keyArr: Array<string> = [];
        for (let i = 0, iLen: number = mapIDArr.length; i < iLen; i++) {
            let config: MapCfgConfig = configs.get(mapIDArr[i]);
            let configKey: string = `${config.mapData}_json`;
            let imgKey: string = `${config.mapRes}_json`;
            let bgImgKey1: string = `${config.bgRes}_1_jpg`;
            let bgImgKey2: string = `${config.bgRes}_2_jpg`;
            if (keyArr.indexOf(configKey) === -1) {
                keyArr.push(configKey);
            }
            if (keyArr.indexOf(imgKey) === -1) {
                keyArr.push(imgKey);
            }
            if (keyArr.indexOf(bgImgKey1) === -1) {
                keyArr.push(bgImgKey1);
            }
            if (keyArr.indexOf(bgImgKey2) === -1) {
                keyArr.push(bgImgKey2);
            }
        }
        if (keyArr.length > 0) {
            RES.createGroup('map', keyArr);
        }
        return ['map', 'soundMap'];
    }

    protected preShow(data: number): void {
        ExerciseProxy.instance().createMapData(data);
    }

    protected show(data?: any): void {
        let modeData: ExerciseModeData = ExerciseProxy.instance().getData();
        //初始化地图
        let map: Map = MapManager.instance().map;
        map.init(modeData.map);
        map.create();
        core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_BG).addChild(map);
    }

    protected hide(): void {
        let map: Map = MapManager.instance().map;
        if (map.parent) {
            map.parent.removeChild(map);
        }
    }
}