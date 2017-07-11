/***
 * 道具鸡肋
 */
class BaseProp extends Goods {

    public animation: egret.MovieClip;

    /**动画名*/
    protected _animName: string;
    /**动画文件*/
    protected _animFileName: string;
 
    constructor(data: BattleGoodsData) {
        super(data);
		this.setAnimation();
    }

    public release(): void {
        super.release();
         if (this.animation) {
            core.MCFactory.instance.revertMovieClip(this._animFileName + '_json', this._animName, this.animation);
            this.animation = null;
        }
    }

    private setAnimation() {
        let fileName: string = this.data.config.name;
        let animName: string = this.data.config.fileName;
        let anim: egret.MovieClip = this.animation;
        if (anim)
        {
            if (anim.isPlaying) 
            {
                this.animation.stop();
            }
            if (this._animName != animName) 
            {
                core.MCFactory.instance.revertMovieClip(this._animFileName + '_json', this._animName, anim);
                anim = core.MCFactory.instance.getMovieClip(fileName + '_json', fileName + '_png', animName, true);
            } 
            else 
            {
                return;
            }
        } 
        else 
        {
            anim = core.MCFactory.instance.getMovieClip(fileName + '_json', fileName + '_png', animName, true);
        }
        this._animName = animName;
        this._animFileName = fileName;
        this.addChild(anim);
        this.animation = anim;
    }

    /**
	 * 继续播放当前动画
	 * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
	 */
    public playAnimation(playTimes: number) {
        if (this.animation) {
            this.animation.play(playTimes);
        }
    }

    public stopAnimation() {
        if (this.animation && this.animation.isPlaying) {
            this.animation.stop();
        }
    }

    public get data(): BattleGoodsData {
        return <BattleGoodsData>this.p_data;
    }

    
}