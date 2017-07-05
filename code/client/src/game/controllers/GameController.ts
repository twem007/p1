class GameController extends core.Control {

    private map: Map;

    constructor(loadingUI: core.ILoadingUI) {
        super(ModuleEnum.GAME, loadingUI);
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
        return ['map'];
    }

    public show(data?: any): void {
        let map: Map = this.map;
        if (!map) {
            map = new Map();
        }
        map.init(data);
        map.create();
        core.LayerCenter.getInstance().getLayer(LayerEnum.BG).addChild(map);
        let mode: IGameMode = GameModeManager.getInstance().getCurMode();
        if (mode) {
            mode.map = map;
        }
    }

    public hide(): void {
        let map: Map = this.map;
        if (map.parent) {
            map.parent.removeChild(map);
        }
    }
}