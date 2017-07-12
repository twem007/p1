var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExerciseProxy = (function () {
    function ExerciseProxy() {
        this.m_data = new ExerciseModeData();
    }
    ExerciseProxy.prototype.getData = function () {
        return this.m_data;
    };
    ExerciseProxy.prototype.createMapData = function (id) {
        var map = new MapData();
        map.update(id);
        this.m_data.map = map;
        this.m_data.goods = [];
        this.m_data.roles = [];
        return map;
    };
    /**
     * 创建主控玩家
     */
    ExerciseProxy.prototype.creatPlayerData = function () {
        var data = new PlayerData();
        return data;
    };
    /**
     * 创建机器人
     */
    ExerciseProxy.prototype.creatRobotData = function (robotCount) {
        return null;
    };
    /**
     * 创建箱子
     */
    ExerciseProxy.prototype.createBoxData = function () {
        var data = this.m_data.map;
        var layer = data.getLayerData(MapLayerEnum.GOODS);
        var tileArr = layer.data;
        for (var i = 0, iLen = tileArr.length; i < iLen; i++) {
            var num = tileArr[i];
            if (num != 0) {
                var col = i % data.cols;
                var row = i / data.cols << 0;
                var attr = data.getTileData(MapTileEnum.BG).getTileProp(num);
                var type = attr.can_move == 1 ? GoodsTypeEnum.MOVE_BOX : GoodsTypeEnum.STATIC_BOX;
                var boxData = new BattleBoxData();
                boxData.row = row;
                boxData.col = col;
                this.m_data.goods.push(boxData);
            }
        }
    };
    ExerciseProxy.instance = function () {
        if (!ExerciseProxy.s_instance) {
            ExerciseProxy.s_instance = new ExerciseProxy();
        }
        return ExerciseProxy.s_instance;
    };
    return ExerciseProxy;
}());
__reflect(ExerciseProxy.prototype, "ExerciseProxy");
//# sourceMappingURL=ExerciseProxy.js.map