var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleAnimGoods = (function (_super) {
    __extends(BattleAnimGoods, _super);
    function BattleAnimGoods(data) {
        var _this = _super.call(this, data) || this;
        _this.updateAnim(data);
        return _this;
    }
    BattleAnimGoods.prototype.release = function () {
        _super.prototype.release.call(this);
        if (this.animation) {
            core.MCFactory.instance.revertMovieClip(this.getData().config.name + "_json", this.getData().config.fileName, this.animation);
        }
        this.p_data = null;
        this.animation = null;
    };
    /**
     * 更新动画
     */
    BattleAnimGoods.prototype.updateAnim = function (data) {
        var fileName = this.getData().config.name;
        var animName = this.getData().config.fileName;
        var animation = core.MCFactory.instance.getMovieClip(fileName + '_json', fileName + '_png', animName, true);
        this.addChild(animation);
        this.animation = animation;
    };
    /**
     * 播放当前动画
     * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
     */
    BattleAnimGoods.prototype.playAnimation = function (playTimes) {
        if (this.animation) {
            this.animation.play(playTimes);
        }
    };
    /**
     * 停止播放动画
     */
    BattleAnimGoods.prototype.stopAnimation = function () {
        if (this.animation && this.animation.isPlaying) {
            this.animation.stop();
        }
    };
    BattleAnimGoods.prototype.getData = function () {
        return this.p_data;
    };
    /**
     * 更新道具数据
     */
    BattleAnimGoods.prototype.setData = function (data) {
        if (this.getData().id != data.id) {
            if (this.getData().sid != data.sid) {
                if (this.animation) {
                    core.MCFactory.instance.revertMovieClip(this.getData().config.name + "_json", this.getData().config.fileName, this.animation);
                }
            }
            _super.prototype.setData.call(this, data);
        }
    };
    return BattleAnimGoods;
}(Goods));
__reflect(BattleAnimGoods.prototype, "BattleAnimGoods");
//# sourceMappingURL=BattleAnimGoods.js.map