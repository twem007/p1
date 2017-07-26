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
    function GameController() {
        return _super.call(this, ModuleEnum.GAME) || this;
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
        return ['map', 'soundMap'];
    };
    GameController.prototype.preShow = function (data) {
        ExerciseProxy.instance().createMapData(data);
    };
    GameController.prototype.show = function (data) {
        var modeData = ExerciseProxy.instance().getData();
        //初始化地图
        var map = MapManager.instance().map;
        map.init(modeData.map);
        map.create();
        core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_BG).addChild(map);
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