var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleData = (function () {
    function BattleData() {
        /**
         * 移动速度(像素/帧)
         */
        this.speed = 0;
        /**
         * 炸弹威力(格)
         */
        this.power = 0;
        /**
         * 炸弹数量
         */
        this.bombCount = 0;
    }
    /**
     * 加上另一个BattleData的数值
     * @param battleData 增量
     * @param toNew 是否将计算结果返回一个新的BattleData而不改变当前BattleData
     * @returns {BattleData}
     */
    BattleData.prototype.sum = function (battleData, toNew) {
        if (toNew === void 0) { toNew = false; }
        var result;
        if (toNew) {
            result = new BattleData();
            result.sum(this);
        }
        else {
            result = this;
        }
        result.bombCount += battleData.bombCount;
        result.power += battleData.power;
        result.speed += battleData.speed;
        return result;
    };
    BattleData.prototype.reset = function () {
        this.bombCount = this.power = this.speed = 0;
    };
    return BattleData;
}());
__reflect(BattleData.prototype, "BattleData");
//# sourceMappingURL=BattleData.js.map