class GameController extends core.Control {

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
        return ['map','soundMap','animMap'];
    }

    public preShow(data: number):void{
        ExerciseProxy.instance().createMapData(data);
        ExerciseProxy.instance().createBoxData();
        ExerciseProxy.instance().creatPlayerData();
        ExerciseProxy.instance().creatRobotData(1);
    }

    public show(data?: any): void {
        let modeData:ExerciseModeData = ExerciseProxy.instance().getData();
        // modeData.goods
        // modeData.player
        // modeData.roles
        // modeData.map
        //初始化地图
        let map: Map = MapManager.instance().map;
        map.init(modeData.map);
        map.create();
        core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_BG).addChild(map);
        //初始化道具
        let goods = modeData.goods;
        if(goods != null)
        {
            let goodsLayer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_GOODS);
            let len = goods.length;
            for(let i=0;i<len;i++)
            {
                let goodsData = goods[i];
                let battleGoods:BattleBoxGoods = GoodsManager.instance().creatBox(goodsData);
                goodsLayer.addChild(battleGoods);
            }
        }
        //初始化主角
        let roleLayer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_ROLE);
        let playerData = modeData.player;
        if(playerData != null)
        {
            let player = RoleManager.instance().create(playerData);
            roleLayer.addChild(player);
            RoleManager.instance().player = player;
        }
        //初始化其他玩家
        let others = modeData.roles;
        if(others != null)
        {
            let len = others.length;
            for(let i=0;i<len;i++)
            {
                let otherData = others[i];
                let otherPlayer = RoleManager.instance().create(otherData);
                roleLayer.addChild(otherPlayer);
            }
        }
        
    }

    public hide(): void {
        let map: Map = MapManager.instance().map;
        if (map.parent) {
            map.parent.removeChild(map);
        }
    }
}