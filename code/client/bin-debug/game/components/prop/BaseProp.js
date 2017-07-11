var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/***
 * 道具鸡肋
 */
var BaseProp = (function (_super) {
    __extends(BaseProp, _super);
    function BaseProp(data) {
        var _this = _super.call(this, data) || this;
        _this.setAnimation();
        return _this;
    }
    BaseProp.prototype.release = function () {
        _super.prototype.release.call(this);
        if (this.animation) {
            core.MCFactory.instance.revertMovieClip(this._animFileName + '_json', this._animName, this.animation);
            this.animation = null;
        }
    };
    BaseProp.prototype.setAnimation = function () {
        var fileName = this.data.config.name;
        var animName = this.data.config.fileName;
        var anim = this.animation;
        if (anim) {
            if (anim.isPlaying) {
                this.animation.stop();
            }
            if (this._animName != animName) {
                core.MCFactory.instance.revertMovieClip(this._animFileName + '_json', this._animName, anim);
                anim = core.MCFactory.instance.getMovieClip(fileName + '_json', fileName + '_png', animName, true);
            }
            else {
                return;
            }
        }
        else {
            anim = core.MCFactory.instance.getMovieClip(fileName + '_json', fileName + '_png', animName, true);
        }
        this._animName = animName;
        this._animFileName = fileName;
        this.addChild(anim);
        this.animation = anim;
    };
    /**
     * 继续播放当前动画
     * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
     */
    BaseProp.prototype.playAnimation = function (playTimes) {
        if (this.animation) {
            this.animation.play(playTimes);
        }
    };
    BaseProp.prototype.stopAnimation = function () {
        if (this.animation && this.animation.isPlaying) {
            this.animation.stop();
        }
    };
    Object.defineProperty(BaseProp.prototype, "data", {
        get: function () {
            return this.p_data;
        },
        enumerable: true,
        configurable: true
    });
    return BaseProp;
}(Goods));
__reflect(BaseProp.prototype, "BaseProp");
//# sourceMappingURL=BaseProp.js.map