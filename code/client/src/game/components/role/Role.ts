class Role extends core.Component {

    protected p_avatar: egret.MovieClip;

    protected p_data: RoleData;

    constructor(data: RoleData) {
        super();
        this.p_data = data;
        this.showAvatar();
    }

    public get data(): RoleData {
        return <RoleData>this.p_data;
    }

    public get avatar(): egret.MovieClip {
        return this.p_avatar;
    }

    private showAvatar(): void {
        let data: RoleData = <RoleData>this.p_data;
        if (this.p_data) {
            let config: RoleConfig = data.config;
            if (config) {
                let normalJsonKey: string = `${config.defBattleFileName}_json`;
                let normalImgKey: string = `${config.defBattleFileName}_png`;
                let ballteJsonKey: string = `${config.battleFileName}_json`;
                let battleImgKey: string = `${config.battleFileName}_png`;
                let avatar = core.MCFactory.instance.getMovieClip(ballteJsonKey, battleImgKey, config.battleName);
                if (!avatar) {
                    avatar = core.MCFactory.instance.getMovieClip(normalJsonKey, normalImgKey, config.defBattleName);
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
                    if (!RES.getGroupByName(config.battleFileName)) {
                        RES.createGroup(config.battleFileName, [ballteJsonKey, battleImgKey]);
                        RES.loadGroup(config.battleFileName);
                    }
                } else {
                    if (this.p_avatar) {
                        core.MCFactory.instance.revertMovieClip(normalJsonKey, config.battleName, this.p_avatar);
                    }
                }
                this.p_avatar = avatar;
                this.addChild(avatar);
            }
        }
    }

    private onLoadGroupComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
    }

    public release(): void {
    }


    protected doLayout(): void {

    }

    //吃道具触发事件
    protected callBeginEatPower(): void { }
    //结束吃道具触发事件
    protected callEndEatPower(): void { }

    /**
     * 执行动作,要将函数move放在update里面才能移动
     * @action  RoleAction枚举里面的动作
     */
    public runAction(action: RoleDirection) {
        //trace(`当前动作：${action} 前一个动作:${this._move.actionBeforeStop}`);
        // this._move.runAction(action);
    }

    private changeRunDirection(action: RoleDirection) {
        this.p_avatar.gotoAndPlay(`run_${action}`, -1);
    }

    private changeStandDirection(action: RoleDirection) {
        this.p_avatar.gotoAndPlay(`idle_${action}`, -1);
    }

    public move(dt: number) {
        // this._move.update(dt);
    }

}