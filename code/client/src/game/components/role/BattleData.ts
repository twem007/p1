class BattleData {

    public x: number;
    public y: number;

    /**
     * 移动速度(像素/帧)
     */
    public speed: number = 0;
    /**
     * 炸弹威力(格)
     */
    public power: number = 0;
    /**
     * 炸弹数量
     */
    public bombCount: number = 0;

    constructor() {

    }

    /**
     * 加上另一个BattleData的数值
     * @param battleData 增量
     * @param toNew 是否将计算结果返回一个新的BattleData而不改变当前BattleData
     * @returns {BattleData}
     */
    public sum(battleData: BattleData, toNew: boolean = false): BattleData {
        let result: BattleData;
        if (toNew) {
            result = new BattleData();
            result.sum(this);
        } else {
            result = this;
        }
        result.bombCount += battleData.bombCount;
        result.power += battleData.power;
        result.speed += battleData.speed;
        return result;
    }

    public reset() {
        this.bombCount = this.power = this.speed = 0;
    }
}