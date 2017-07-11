var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role = (function (_super) {
    __extends(Role, _super);
    function Role(data) {
        var _this = _super.call(this) || this;
        _this.p_data = data;
        _this.showAvatar();
        return _this;
    }
    Object.defineProperty(Role.prototype, "data", {
        get: function () {
            return this.p_data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "avatar", {
        get: function () {
            return this.p_avatar;
        },
        enumerable: true,
        configurable: true
    });
    Role.prototype.showAvatar = function () {
        var data = this.p_data;
        if (this.p_data) {
            var config = data.config;
            if (config) {
                var normalJsonKey = config.defBattleFileName + "_json";
                var normalImgKey = config.defBattleFileName + "_png";
                var ballteJsonKey = config.battleFileName + "_json";
                var battleImgKey = config.battleFileName + "_png";
                var avatar = core.MCFactory.instance.getMovieClip(ballteJsonKey, battleImgKey, config.battleName);
                if (!avatar) {
                    avatar = core.MCFactory.instance.getMovieClip(normalJsonKey, normalImgKey, config.defBattleName);
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
                    if (!RES.getGroupByName(config.battleFileName)) {
                        RES.createGroup(config.battleFileName, [ballteJsonKey, battleImgKey]);
                        RES.loadGroup(config.battleFileName);
                    }
                }
                else {
                    if (this.p_avatar) {
                        core.MCFactory.instance.revertMovieClip(normalJsonKey, config.battleName, this.p_avatar);
                    }
                }
                this.p_avatar = avatar;
                this.addChild(avatar);
            }
        }
    };
    Role.prototype.onLoadGroupComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
    };
    Role.prototype.release = function () {
    };
    Role.prototype.doLayout = function () {
    };
    //吃道具触发事件
    Role.prototype.callBeginEatPower = function () { };
    //结束吃道具触发事件
    Role.prototype.callEndEatPower = function () { };
    /**
     * 执行动作,要将函数move放在update里面才能移动
     * @action  RoleAction枚举里面的动作
     */
    Role.prototype.runAction = function (action) {
        //trace(`当前动作：${action} 前一个动作:${this._move.actionBeforeStop}`);
        // this._move.runAction(action);
    };
    Role.prototype.changeRunDirection = function (action) {
        this.p_avatar.gotoAndPlay("run_" + action, -1);
    };
    Role.prototype.changeStandDirection = function (action) {
        this.p_avatar.gotoAndPlay("idle_" + action, -1);
    };
    Role.prototype.move = function (dt) {
        // this._move.update(dt);
    };
    return Role;
}(core.Component));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map