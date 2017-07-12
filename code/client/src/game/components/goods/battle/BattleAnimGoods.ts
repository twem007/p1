class BattleAnimGoods extends Goods {
    public animation: egret.MovieClip;

    constructor(data: BattleGoodsData) {
        super(data);
        this.updateAnim(data);
    }

    public release(): void {
        super.release();
        if (this.animation) {
            core.MCFactory.instance.revertMovieClip(`${this.getData().config.name}_json`, this.getData().config.fileName, this.animation);
        }
        this.p_data = null;
        this.animation = null;
    }
    /**
     * 更新动画
     */
    private updateAnim(data: BattleGoodsData) {
        let fileName: string = this.getData().config.name;
        let animName: string = this.getData().config.fileName;
        let animation: egret.MovieClip = core.MCFactory.instance.getMovieClip(fileName + '_json', fileName + '_png', animName, true);
        this.addChild(animation);
        this.animation = animation;
    }

    /**
	 * 播放当前动画
	 * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
	 */
    public playAnimation(playTimes: number) {
        if (this.animation) {
            this.animation.play(playTimes);
        }
    }
    /**
     * 停止播放动画
     */
    public stopAnimation() {
        if (this.animation && this.animation.isPlaying) {
            this.animation.stop();
        }
    }

    public getData():BattleGoodsData{
        return <BattleGoodsData>this.p_data;
    }
    /**
     * 更新道具数据
     */
    public setData(data: BattleGoodsData): void {
        if (this.getData().id != data.id) {
            if (this.getData().sid != data.sid) {
                if (this.animation) {
                    core.MCFactory.instance.revertMovieClip(`${this.getData().config.name}_json`, this.getData().config.fileName, this.animation);
                }
            }
            super.setData(data);
        }
    }
}