var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameController = (function (_super) {
    __extends(GameController, _super);
    function GameController(loadingUI) {
        return _super.call(this, ModuleEnum.GAME, loadingUI) || this;
    }
    GameController.prototype.getLoadGroup = function (data) {
        var configs = Config.getConfig(MapCfgConfig);
        var mapIDArr = [101, 102, 103];
        var keyArr = [];
        for (var i = 0, iLen = mapIDArr.length; i < iLen; i++) {
            var config = configs.get(mapIDArr[i]);
            var configKey = config.mapData + "_json";
            var imgKey = config.mapRes + "_json";
            var bgImgKey1 = config.bgRes + "_1_jpg";
            var bgImgKey2 = config.bgRes + "_2_jpg";
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
        return ['map', 'soundMap', 'animMap'];
    };
    GameController.prototype.preShow = function (data) {
        ExerciseProxy.instance().createMapData(data);
        ExerciseProxy.instance().createBoxData();
        ExerciseProxy.instance().creatPlayerData();
        ExerciseProxy.instance().creatRobotData(1);
    };
    GameController.prototype.show = function (data) {
        var modeData = ExerciseProxy.instance().getData();
        // modeData.goods
        // modeData.player
        // modeData.roles
        // modeData.map
        //初始化地图
        var map = MapManager.instance().map;
        map.init(modeData.map);
        map.create();
        core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_BG).addChild(map);
        //初始化道具
        var goods = modeData.goods;
        if (goods != null) {
            var goodsLayer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_GOODS);
            var len = goods.length;
            for (var i = 0; i < len; i++) {
                var goodsData = goods[i];
                var battleGoods = GoodsManager.instance().creatBox(goodsData);
                goodsLayer.addChild(battleGoods);
            }
        }
        //初始化主角
        var roleLayer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_ROLE);
        var playerData = modeData.player;
        if (playerData != null) {
            var player = RoleManager.instance().create(playerData);
            roleLayer.addChild(player);
            RoleManager.instance().player = player;
        }
        //初始化其他玩家
        var others = modeData.roles;
        if (others != null) {
            var len = others.length;
            for (var i = 0; i < len; i++) {
                var otherData = others[i];
                var otherPlayer = RoleManager.instance().create(otherData);
                roleLayer.addChild(otherPlayer);
            }
        }
    };
    GameController.prototype.hide = function () {
        var map = MapManager.instance().map;
        if (map.parent) {
            map.parent.removeChild(map);
        }
    };
    return GameController;
}(core.Control));
__reflect(GameController.prototype, "GameController");
//# sourceMappingURL=GameController.js.map