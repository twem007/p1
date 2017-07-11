var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExerciseProxy = (function () {
    function ExerciseProxy() {
        var data = new ExerciseModeData();
        data.mapID = 101;
        data.player = this.creatPlayer();
        this.m_data = data;
    }
    ExerciseProxy.prototype.getData = function () {
        return this.m_data;
    };
    /**
     * 创建主控玩家
     */
    ExerciseProxy.prototype.creatPlayer = function () {
        var data = new PlayerData();
        return data;
    };
    /**
     * 创建机器人
     */
    ExerciseProxy.prototype.creatRobot = function (robotCount) {
        return null;
    };
    /**
     * 创建箱子
     */
    ExerciseProxy.prototype.createBox = function () {
        var data = new MapData();
        data.update(this.m_data.mapID);
        var tileArr = data.getLayerData(MapLayerEnum.GOODS).data;
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