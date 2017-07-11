var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CombatControlView = (function (_super) {
    __extends(CombatControlView, _super);
    /**************************************** */
    function CombatControlView() {
        var _this = _super.call(this) || this;
        /**点击移动的位置 */
        _this.m_pMouseMovePoint = new egret.Point();
        /**点击开始的位置 */
        _this.m_pMouseBeginPoint = new egret.Point();
        /**每局时间（秒） */
        _this.m_pPlayTime = 10;
        /**游戏时间快结束时播放的时间特效秒数 */
        _this.m_pTimeOutES = 10015;
        /**第一技能遮罩 */
        _this.m_pShapeThrough = new egret.Shape();
        /**第一技能CD方法类 */
        _this.m_pThroughViewSkill = new ViewSkillCD();
        /**第二技能遮罩 */
        _this.m_pShapeSpeed = new egret.Shape();
        /**第二技能CD方法类 */
        _this.m_pSpeedViewSkill = new ViewSkillCD();
        /********************** */
        /**游戏暂停 */
        _this.m_pIsGameResStart = false;
        /**倒数的秒数 */
        _this.m_pLastTime = 5;
        /**玩家队伍的ID */
        _this.m_pPlayerTeamId = null;
        /**存储头像对象 */
        _this.m_pTeamPlayerArr = [];
        _this.skinName = "resource/skins/combat/CombatControlSkin.exml";
        return _this;
    }
    /**初始化子对象 */
    CombatControlView.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.initState();
        //技能cd
        this.initShape(this.m_pShapeSpeed, this.m_pSpeedSkillGroup);
        //初始广播数据
        BroadcastManager.getInstance.m_pIsAllKill = true;
        BroadcastManager.getInstance.m_pAllKillData = [];
        BroadcastManager.getInstance.m_pIsKill = true;
        BroadcastManager.getInstance.m_pKillData = [];
        /**第二技能倒计时显示文本  */
        this.m_pSkillCDSpeedLab.visible = false;
        this.m_pSpeedSkillMask.visible = false;
        /**第二技能禁止图标 */
        this.m_pSpeedStop.visible = false;
        this.m_pSpeedViewSkill.m_pSkillCDLab = this.m_pSkillCDSpeedLab;
        this.m_pSpeedViewSkill.m_pSkillMask = this.m_pSpeedSkillMask;
        this.m_pSpeedViewSkill.m_pShape = this.m_pShapeSpeed;
        //按钮大小
        this.m_pSpeedSkillGroup.scaleX = SkillBtnData.m_pSpeedBtnScale;
        this.m_pSpeedSkillGroup.scaleY = SkillBtnData.m_pSpeedBtnScale;
        //按钮透明度
        this.m_pSpeedSkillGroup.alpha = SkillBtnData.m_pSkillBtnAlpha;
    };
    /**初始化监听事件 */
    CombatControlView.prototype.addListener = function () {
        _super.prototype.addListener.call(this);
        //摇杆
        this.m_pTouchBgImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickBgBeginEvent, this, true);
        this.m_pTouchBgImg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClickBgMoveEvent, this, true);
        this.m_pTouchBgImg.addEventListener(egret.TouchEvent.TOUCH_END, this.onClickBgEndEvent, this, true);
        this.m_pTouchBgImg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onClickBgEndEvent, this, true);
        //道具按钮
        this.m_pSkillBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquipBtn1_Click, this);
        this.m_pSkillBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquipBtn1_Click, this);
        this.m_pSkillBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquipBtn1_Click, this);
        //第二技能按钮
        this.m_pSpeedSkillBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.sendSpeedUpMsg, this);
        //击杀
        core.EventCenter.getInstance().addEventListener(MapEvent.KILL_ROLE, this.getKillMsg, this);
        // //触发技能事件
        // core.EventCenter.getInstance().addEventListener(SkillEvent.USE_SKILL_M2V, this.startSkill, this);
        // //停止技能事件
        // core.EventCenter.getInstance().addEventListener(SkillEvent.STOP_SKILL, this.stopSkill, this);
        // // 主角爆发信息
        // core.EventCenter.getInstance().addEventListener(RoleEvent.STATUS_CHANGED, this.powerUP, this);
        //键盘事件Down
        core.InputManager.getInstance().addKeyListener(InputType.SKILL_1, this.onClickSkill1, this);
        core.InputManager.getInstance().addKeyListener(InputType.SKILL_2, this.onClickSkill2, this);
        core.InputManager.getInstance().addKeyListener(InputType.SKILL_3, this.onClickSkill3, this);
        core.InputManager.getInstance().addKeyListener(InputType.SKILL_4, this.onClickSkill4, this);
        // // 游戏停止
        // core.EventCenter.getInstance().addEventListener(GameConst.GAME_PAUSE, this.gamePause, this);
        // //游戏开始
        // core.EventCenter.getInstance().addEventListener(GameConst.GAME_RESTART, this.gameResStart, this);
        // //使用道具后
        // core.EventCenter.getInstance().addEventListener(EquipmentEvent.USE_EQUIPMENT_M2V, this.onEquipmentUsed, this);
        // //刷新道具信息
        // core.EventCenter.getInstance().addEventListener(EquipmentEvent.EQUIPMENT_DATA_CHANGED_M2V, this.onRefreshEquipment, this);
        // /**获取队伍消息 */
        // core.EventCenter.getInstance().addEventListener(GameModEvent.STEP_CHANGED, this.getTeamMsg, this);
        // /**监听游戏结束信息 */
        // core.EventCenter.getInstance().addEventListener(GameModEvent.MATCH_END, this.gameOver, this);
        // /**监听炸弹相关 */
        // core.EventCenter.getInstance().addEventListener(BombEvent.HAPPEN_EXPLODE, this.setBoomNum, this);
        // core.EventCenter.getInstance().addEventListener(BombEvent.BOMB_CREATED_M2V, this.setBoomNum, this);
        // core.EventCenter.getInstance().addEventListener(BombEvent.BOMB_DETONATED_M2V, this.setBoomNum, this);
        // core.EventCenter.getInstance().addEventListener(BombEvent.EAT_BOMB_PROP_M2V, this.setBoomNum, this);
        //监听复仇标记位置
        core.EventCenter.getInstance().addEventListener(MapEvent.TRACE_TARGET, this.changeFlagPoint, this);
        //设置最后倒计时特效
        // let lists:Dictionary<SystemParametersConfig> = Config.getConfig(SystemParametersConfig);
        // let obj:SystemParametersConfig = lists.get('countdown_time');
        // let attr:any = obj.parameter;
        // this.m_pTimeOutES = attr;
        //测试限时结束界面
        // egret.Tween.get(this).wait(3000).call(()=>this.testTimeOver());
    };
    /**删除监听 */
    CombatControlView.prototype.removeListener = function () {
        _super.prototype.removeListener.call(this);
        //摇杆
        this.m_pTouchBgImg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickBgBeginEvent, this);
        this.m_pTouchBgImg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClickBgMoveEvent, this);
        this.m_pTouchBgImg.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClickBgEndEvent, this);
        this.m_pTouchBgImg.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onClickBgEndEvent, this);
        //第一技能按钮
        this.m_pSkillBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquipBtn1_Click, this);
        this.m_pSkillBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquipBtn1_Click, this);
        this.m_pSkillBtn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEquipBtn1_Click, this);
        //第二技能按钮
        this.m_pSpeedSkillBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.sendSpeedUpMsg, this);
        // //击杀
        core.EventCenter.getInstance().removeEventListener(MapEvent.KILL_ROLE, this.getKillMsg, this);
        // //触发技能事件
        // core.EventCenter.getInstance().removeEventListener(SkillEvent.USE_SKILL_M2V, this.startSkill, this);
        // //停止技能事件
        // core.EventCenter.getInstance().removeEventListener(SkillEvent.STOP_SKILL, this.stopSkill, this);
        // // 主角爆发信息
        // core.EventCenter.getInstance().removeEventListener(RoleEvent.STATUS_CHANGED, this.powerUP, this);
        //键盘事件
        core.InputManager.getInstance().addKeyListener(InputType.SKILL_1, this.onClickSkill1, this);
        core.InputManager.getInstance().addKeyListener(InputType.SKILL_2, this.onClickSkill2, this);
        core.InputManager.getInstance().addKeyListener(InputType.SKILL_3, this.onClickSkill3, this);
        core.InputManager.getInstance().addKeyListener(InputType.SKILL_4, this.onClickSkill4, this);
        // // 游戏停止
        // core.EventCenter.getInstance().removeEventListener(GameConst.GAME_PAUSE, this.gamePause, this);
        // //游戏开始
        // core.EventCenter.getInstance().removeEventListener(GameConst.GAME_RESTART, this.gameResStart, this);
        // //使用道具后
        // core.EventCenter.getInstance().removeEventListener(EquipmentEvent.USE_EQUIPMENT_M2V, this.onEquipmentUsed, this);
        // //刷新道具信息
        // core.EventCenter.getInstance().removeEventListener(EquipmentEvent.EQUIPMENT_DATA_CHANGED_M2V, this.onRefreshEquipment, this);
        // /**获取队伍消息 */
        // core.EventCenter.getInstance().removeEventListener(GameModEvent.STEP_CHANGED, this.getTeamMsg, this);
        // /**监听游戏结束信息 */
        // core.EventCenter.getInstance().removeEventListener(GameModEvent.MATCH_END, this.gameOver, this);
        // /**监听炸弹相关 */
        // core.EventCenter.getInstance().removeEventListener(BombEvent.HAPPEN_EXPLODE, this.setBoomNum, this);
        // core.EventCenter.getInstance().removeEventListener(BombEvent.BOMB_CREATED_M2V, this.setBoomNum, this);
        // core.EventCenter.getInstance().removeEventListener(BombEvent.BOMB_DETONATED_M2V, this.setBoomNum, this);
        // core.EventCenter.getInstance().removeEventListener(BombEvent.EAT_BOMB_PROP_M2V, this.setBoomNum, this);
        //监听复仇标记位置
        core.EventCenter.getInstance().removeEventListener(MapEvent.TRACE_TARGET, this.changeFlagPoint, this);
        //第一按钮cd取消监听
        this.m_pThroughViewSkill.removeEvent();
        //第二按钮cd取消监听
        this.m_pSpeedViewSkill.removeEvent();
    };
    CombatControlView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        this.removeTween();
    };
    CombatControlView.prototype.release = function () {
    };
    /**清除动画 */
    CombatControlView.prototype.removeTween = function () {
        egret.Tween.removeTweens(this.m_pTimeFontGroup);
        egret.Tween.removeTweens(this.m_pKillGroup);
        egret.Tween.removeTweens(this.m_pKillLeftGroup);
        egret.Tween.removeTweens(this.m_pKillRightGroup);
        egret.Tween.removeTweens(this.m_pKillImg);
        egret.Tween.removeTweens(this.m_pKillSelfGroup);
        egret.Tween.removeTweens(this.m_pSeeDot1);
        egret.Tween.removeTweens(this.m_pSeeDot2);
        egret.Tween.removeTweens(this.m_pSeeDot3);
    };
    /**同步窗口位置 */
    CombatControlView.prototype.onAdaptive = function () {
        UIManager.changeSizeByWidth(this.m_pMainGroup, 1);
        UIManager.updataPoint(this.m_pSeeGroup, 715, 574);
        UIManager.leftBelowAdaptive(this.m_pRokerImage, 178, 566);
        UIManager.leftBelowAdaptive(this.m_pRokerBgImg, 178, 566);
        UIManager.upHeightSize(this.m_pSpeedBgGroup, 1.4);
        UIManager.upHeightSize(this.m_pSkillBtn1, 0.8);
        UIManager.upHeightSize(this.m_pSkillBtn2, 0.8);
        UIManager.upHeightSize(this.m_pSkillBtn3, 0.8);
        UIManager.rightBelowAdaptive(this.m_pSpeedBgGroup, 1214, 633);
        UIManager.rightBelowAdaptive(this.m_pSkillBtn1, 1200, 478);
        UIManager.rightBelowAdaptive(this.m_pSkillBtn2, 1086, 540);
        UIManager.rightBelowAdaptive(this.m_pSkillBtn3, 1053, 662);
    };
    /**初始化UI状态 */
    CombatControlView.prototype.initState = function () {
        this.m_pKillGroup.visible = false;
        this.m_pKillSelfGroup.visible = false;
        this.m_pLeftTeamLead.visible = false;
        this.m_pRightTeamLead.visible = false;
        this.m_pMyTeamArr.visible = false;
        this.m_pEnemyTeamArr1.visible = false;
        this.m_pEnemyTeamArr2.visible = false;
        this.m_pCombatStartGroup.visible = false;
        this.m_pLastTimeGroup.visible = false;
        this.m_pEndGroup.visible = false;
        this.m_pRightTeamPlayr1.currentState = "enemyTeam";
        this.m_pRightTeamPlayr2.currentState = "enemyTeam";
        this.m_pLeftTeamPlayr1.currentState = "myTeam";
        this.m_pLeftTeamPlayr2.currentState = "myTeam";
        this.m_pRightTeamPlayr1.m_pDeadGroup.visible = false;
        this.m_pRightTeamPlayr2.m_pDeadGroup.visible = false;
        this.m_pLeftTeamPlayr1.m_pDeadGroup.visible = false;
        this.m_pLeftTeamPlayr2.m_pDeadGroup.visible = false;
        this.m_pTeamPlayerArr.push(this.m_pRightTeamPlayr1, this.m_pRightTeamPlayr2, this.m_pLeftTeamPlayr1, this.m_pLeftTeamPlayr2);
        BroadcastManager.getInstance.m_pKillSelfLab = this.m_pKillSelfNameLab;
        BroadcastManager.getInstance.m_pKillerLab = this.m_pKillerNameLab;
        BroadcastManager.getInstance.m_pDeadLab = this.m_pDeadNameLab;
        BroadcastManager.getInstance.m_pKillGroup = this.m_pKillGroup;
        BroadcastManager.getInstance.m_pKillSelfGroup = this.m_pKillSelfGroup;
        BroadcastManager.getInstance.m_pKillLeftGroup = this.m_pKillLeftGroup;
        BroadcastManager.getInstance.m_pKillRightGroup = this.m_pKillRightGroup;
        BroadcastManager.getInstance.m_pKillImg = this.m_pKillImg;
        BroadcastManager.getInstance.m_pKillerImg = this.m_pKillerImg;
        BroadcastManager.getInstance.m_pDeadImg = this.m_pDeadImg;
        BroadcastManager.getInstance.m_pKillSelfImg = this.m_pKillSelfImg;
        this.m_pSeeGroup.visible = false;
    };
    /**修改网络标识 */
    CombatControlView.prototype.setLinkImg = function () {
        var delay = TimerUtils.getNetDelay();
        if (delay >= 999) {
            delay = 999;
        }
        this.m_pLinkLab.text = delay + "m";
        if (delay <= 100) {
            this.m_pLinkImg.source = "combatUI_json.combat_link_01";
        }
        else if (delay >= 101 && delay <= 200) {
            this.m_pLinkImg.source = "combatUI_json.combat_link_02";
        }
        else if (delay > 200) {
            this.m_pLinkImg.source = "combatUI_json.combat_link_03";
        }
    };
    /**获取击杀消息 */
    CombatControlView.prototype.getKillMsg = function (evt) {
        // let data = evt.messageData;
        // let player = MapManager.getInstance().getPlayer();
        // let roleList = MapManager.getInstance().roleList;
        // let winner: RoleObject = MapManager.getInstance().getRoleById(data.winnerID);
        // let loser: RoleObject = MapManager.getInstance().getRoleById(data.loserID);
        // if (winner == null || loser == null) {
        // 	trace("击杀或者被杀为NULL");
        // 	return;
        // }
        // let winnerData: RoleData = winner.data;
        // let loserData: RoleData = loser.data;
        // let killerName: string = winnerData.name;
        // let loserName: string = loserData.name;
        // for (var i = 0; i < this.m_pTeamPlayerArr.length; i++) {
        // 	if (this.m_pTeamPlayerArr[i].m_pBattleID == loser.data.battleID) {
        // 		this.m_pTeamPlayerArr[i].m_pDeadGroup.visible = true;
        // 	}
        // }
        // //击杀广播特效**********
        // let allKillData = { killer: winner, loser: loser };
        // BroadcastManager.getInstance.m_pAllKillData.push(allKillData);
        // if (BroadcastManager.getInstance.m_pIsAllKill == true) {
        // 	BroadcastManager.getInstance.m_pIsAllKill = false;
        // 	BroadcastManager.getInstance.setKillMsg();
        // }
        // if (loserData.battleID == player.data.battleID) {
        // 	this.m_pSeeGroup.visible = true;
        // 	BroadcastManager.getInstance.seeModAnim(this.m_pSeeDot1, this.m_pSeeDot2, this.m_pSeeDot3);
        // }
    };
    /**初始技能CD遮罩 */
    CombatControlView.prototype.initShape = function (shape, group) {
        shape.x = group.width * 0.5;
        shape.y = group.height * 0.5;
        shape.rotation = -90;
        // shape.alpha = 0.3;
        group.addChildAt(shape, 2);
    };
    CombatControlView.prototype.onClickSkill1 = function () {
        this.sendSpeedUpMsg();
    };
    CombatControlView.prototype.onClickSkill2 = function () {
        this.sendUseEquipmentMsg(0);
        ButtonManager.btnChangeByScale(this.m_pSkillBtn1, 1, 0.8);
    };
    CombatControlView.prototype.onClickSkill3 = function () {
        this.sendUseEquipmentMsg(1);
        ButtonManager.btnChangeByScale(this.m_pSkillBtn2, 1, 0.8);
    };
    CombatControlView.prototype.onClickSkill4 = function () {
        this.sendUseEquipmentMsg(2);
        ButtonManager.btnChangeByScale(this.m_pSkillBtn3, 1, 0.8);
    };
    CombatControlView.prototype.onEquipBtn1_Click = function (event) {
        var target = event.$currentTarget;
        switch (target) {
            case this.m_pSkillBtn1:
                ButtonManager.btnChangeByScale(this.m_pSkillBtn1, 1, 0.8);
                this.sendUseEquipmentMsg(0);
                break;
            case this.m_pSkillBtn2:
                ButtonManager.btnChangeByScale(this.m_pSkillBtn2, 1, 0.8);
                this.sendUseEquipmentMsg(1);
                break;
            case this.m_pSkillBtn3:
                ButtonManager.btnChangeByScale(this.m_pSkillBtn3, 1, 0.8);
                this.sendUseEquipmentMsg(2);
                break;
        }
    };
    /**
     * 发送道具使用请求
     * @param eqIdx 道具格子0-2
     */
    CombatControlView.prototype.sendUseEquipmentMsg = function (eqIdx) {
        // if (!MapManager.getInstance().isInit || MapManager.getInstance().isRoundOver) return;
        // let player = MapManager.getInstance().getPlayer();
        // //EventCenter.instance.sendMsg(EquipmentEvent.USE_EQUIPMENT_V2C, player.data.equipmentCells[0]);
        // EventCenter.sendEvent(new EquipmentEvent(EquipmentEvent.USE_EQUIPMENT_REQ, player, player.data.equipmentListManager.getCellByIdx(eqIdx)));
        // return;
        // if (this.m_pThroughViewSkill.m_pIsSkillStart == false && player.data.isAlive()) {
        // 	// egret.log("发送执行技能信息");
        // 	ButtonManager.btnChangeByScale(this.m_pThroughSkillGroup, SkillBtnData.m_pThroughBtnScale - 0.1, SkillBtnData.m_pThroughBtnScale);
        // 	EventCenter.instance.sendMsg(MapEvent.ACROSS_WALL);
        // }
    };
    /**技能返回入口 */
    CombatControlView.prototype.startSkill = function () {
        // let data: any = e.messageData;
        // let skillName = data.skillName;
        // let role = data.role;
        // let player = MapManager.getInstance().getPlayer();
        // if (this.m_pThroughViewSkill.m_pIsSkillStart == false && skillName == SkillName.SPAN_WALL && role == player) {
        // 	this.skillExecute(this.m_pThroughViewSkill, skillName);
        // } else if (this.m_pSpeedViewSkill.m_pIsSkillStart == false && skillName == SkillName.SPEED && role == player) {
        // 	this.skillExecute(this.m_pSpeedViewSkill, skillName);
        // }
    };
    CombatControlView.prototype.skillExecute = function (viewSkill, skillName) {
        // let player = MapManager.getInstance().getPlayer();
        // viewSkill.removCD();
        // viewSkill.m_pIsSkillStart = true;
        // let playerData: RoleData = player.data;
        // let skillData: SkillData = playerData.skillList[skillName];
        // let time = skillData.cdTime * 0.001;
        // viewSkill.startSkillCD(time);
    };
    /**发送第二技能信息
     *
     */
    CombatControlView.prototype.sendSpeedUpMsg = function () {
        // if (!MapManager.getInstance().isInit || MapManager.getInstance().isRoundOver) return;
        // let player = MapManager.getInstance().getPlayer();
        // if (this.m_pSpeedViewSkill.m_pIsSkillStart == false && player.data.isAlive()) {
        // 	ButtonManager.btnChangeByScale(this.m_pSpeedSkillGroup, SkillBtnData.m_pSpeedBtnScale - 0.1, SkillBtnData.m_pSpeedBtnScale);
        // 	// EventCenter.instance.sendMsg(MapEvent.PLANT_BOMB_REQ);
        // 	EventCenter.sendEvent(new SkillEvent(SkillEvent.USE_SKILL_REQ, player, player.data.skillList[SkillName.INSTALL_BOMB]));
        // }
    };
    /**技能结束消息 */
    CombatControlView.prototype.stopSkill = function (e) {
        // let data: any = e.messageData;
        // let skillName = data.skillName;
        // let role = data.role;
        // let player = MapManager.getInstance().getPlayer();
    };
    /**重新启动技能cd */
    CombatControlView.prototype.startResSkill = function (skillType, viewSkillCD) {
        // let playerData: RoleData = MapManager.getInstance().getPlayer().data;
        // let skillData: SkillData = playerData.skillList[skillType];
        // if (skillData.isCd == true) {
        // 	let nowCdTime = skillData.surplusCdTime * 0.001;
        // 	let cdTime = skillData.cdTime * 0.001
        // 	viewSkillCD.removCD();
        // 	viewSkillCD.m_pIsSkillStart = true;
        // 	let cdTimePercentage: number = 360 - ((skillData.surplusCdTime / skillData.cdTime) * 360);
        // 	viewSkillCD.m_pAngle = cdTimePercentage;
        // 	viewSkillCD.startSkillCD(cdTime);
        // 	viewSkillCD.m_pNowCd = nowCdTime;
        // 	viewSkillCD.m_pCdNum = (nowCdTime - Math.floor(nowCdTime)) * 10;
        // 	if (viewSkillCD.m_pCdNum > 0) {
        // 		viewSkillCD.m_pIsDecimals = true;
        // 	}
        // 	if (viewSkillCD.m_pNowCd > 9) {
        // 		viewSkillCD.m_pSkillCDLab.x = 77;
        // 	}
        // 	else {
        // 		viewSkillCD.m_pSkillCDLab.x = 77 + viewSkillCD.m_pSkillCDLab.width / 4;
        // 	}
        // 	viewSkillCD.m_pSkillCDLab.text = "" + Math.ceil(nowCdTime) + "";
        // } else {
        // 	viewSkillCD.removCD();
        // }
    };
    /**爆发事件 */
    CombatControlView.prototype.powerUP = function (e) {
        // let data: any = e.messageData;
        // let player: RoleObject = data.role;
        // if (player) {
        // 	let data: RoleData = player.data;
        // 	if (data) {
        // 		if (data.isPlayer) {
        // 			switch (data.status) {
        // 				case RoleState.WILD:
        // 					break;
        // 				case RoleState.NORMAL:
        // 					break;
        // 				case RoleState.INVINCIBLE:
        // 					break;
        // 				case RoleState.SPEED:
        // 					break;
        // 				case RoleState.DEAD:
        // 					break;
        // 				default:
        // 					break;
        // 			}
        // 		}
        // 	}
        // }
    };
    /**点击背景开始事件 */
    CombatControlView.prototype.onClickBgBeginEvent = function (evt) {
        // if (!MapManager.getInstance().isInit || MapManager.getInstance().isRoundOver) return;
        // evt.stopPropagation();
        // evt.preventDefault();
        // this.m_pMouseBeginPoint.x = evt.stageX;
        // this.m_pMouseBeginPoint.y = evt.stageY;
        // let beginPoint = new egret.Point(evt.stageX, evt.stageY)
        // RockerManager.getInstance.moveRoker(beginPoint, this.m_pMouseBeginPoint, this.m_pRokerImage);
        // this.m_pRokerImage.x = evt.stageX;
        // this.m_pRokerImage.y = evt.stageY;
        // this.m_pRokerBgImg.x = evt.stageX;
        // this.m_pRokerBgImg.y = evt.stageY;
    };
    CombatControlView.prototype.onClickFirstPoint = function (stageX, stageY, obj) {
        if (stageX > obj.x - (obj.width * 0.5) && stageX < obj.x + (obj.width * 0.5) && stageY > obj.y - (obj.height * 0.5) && stageY < obj.y + (obj.height * 0.5)) {
            return true;
        }
        return false;
    };
    /**点击背景移动事件 */
    CombatControlView.prototype.onClickBgMoveEvent = function (evt) {
        // if (!MapManager.getInstance().isInit || MapManager.getInstance().isRoundOver) return;
        // evt.stopPropagation();
        // evt.preventDefault();
        // this.m_pMouseMovePoint.x = evt.stageX;
        // this.m_pMouseMovePoint.y = evt.stageY;
        // RockerManager.getInstance.setRokerCentre(this.m_pMouseBeginPoint, this.m_pMouseMovePoint, this.m_pRokerBgImg, this.m_pRokerImage);
        // RockerManager.getInstance.moveRoker(this.m_pMouseMovePoint, this.m_pMouseBeginPoint, this.m_pRokerImage);
    };
    /**点击背景结束事件 */
    CombatControlView.prototype.onClickBgEndEvent = function (evt) {
        // if (!MapManager.getInstance().isInit || MapManager.getInstance().isRoundOver) return;
        // evt.stopPropagation();
        // evt.preventDefault();
        // UIManager.leftBelowAdaptive(this.m_pRokerImage, 178, 566);
        // UIManager.leftBelowAdaptive(this.m_pRokerBgImg, 178, 566);
        // core.EventCenter.getInstance().sendEvent(new core.EventData(MapEvent.TOUCHBG_MSG, RoleDirection.STAND));
        // let upPoint = new egret.Point(evt.stageX, evt.stageY);
        // switch (evt.currentTarget) {
        // 	case this.m_pTouchBgImg:
        // 		//初始化摇杆控制条件值
        // 		RockerManager.getInstance.m_pNowDirection = 100;
        // 		break;
        // }
    };
    /**限时模式倒计时方法 */
    CombatControlView.prototype.timeRun = function () {
        // if (this.m_pGameModTeam) {
        // 	let time: number = Math.ceil((this.m_pGameModTeam.roundEndTime - RoomModel.instance().getPastTime()) * 0.001);
        // 	if (time) {
        // 		this.m_pPlayTime = time;
        // 		if (this.m_pPlayTime <= this.m_pTimeOutES) {
        // 			SoundUtils.getInstance().playSound('7');
        // 			if (this.m_pTimeFontGroup != null && this.m_pPlayTime >= 0) {
        // 				this.m_pTimeFontGroup.scaleX = this.m_pTimeFontGroup.scaleX * 2;
        // 				this.m_pTimeFontGroup.scaleY = this.m_pTimeFontGroup.scaleY * 2;
        // 				egret.Tween.get(this.m_pTimeFontGroup).to({ scaleX: 1, scaleY: 1 }, 500);
        // 			}
        // 		}
        // 		let time1 = Time.timeMinuteToString(this.m_pPlayTime);
        // 		let time2 = Time.timeSecondsToString(this.m_pPlayTime);
        // 		if (this.m_pTimeLab1 && this.m_pPlayTime >= 0) {
        // 			this.m_pTimeLab1.text = time1;
        // 			this.m_pTimeLab2.text = time2;
        // 		}
        // 		if (this.m_pPlayTime <= 0 && this.timeRun != null) {
        // 			core.TimerManager.instance.removeTick(this.timeRun, this);
        // 		}
        // 	}
        // }
    };
    /**游戏暂停 */
    CombatControlView.prototype.gamePause = function () {
        this.m_pIsGameResStart = true;
    };
    /**游戏开始 */
    CombatControlView.prototype.gameResStart = function () {
        // if (RoomModel.instance().isNetMode) {
        // 	AGame.CSocket.getInstance().close();
        // 	CommonHintView.m_pText = "网络断开，点击确定返回主界面";
        // 	CommonHintView.m_pCondition = CommonReturnType.BUTTON_RETURN_MAIN;
        // core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.COMMON));
        // }
    };
    // private onEquipmentUsed(e: EquipmentEvent) {
    // 	if (e.role != MapManager.getInstance().getPlayer()) {
    // 		return;
    // 	}
    // 	this.refreshEquipment();
    // }
    // private onRefreshEquipment(e: EquipmentEvent) {
    // 	if (e.role != MapManager.getInstance().getPlayer()) {
    // 		return;
    // 	}
    // 	this.refreshEquipment();
    // }
    /**获得道具时切换图片 */
    // private refreshEquipment() {
    // 	let eqMng = MapManager.getInstance().getPlayer().data.equipmentListManager;
    // 	let cell: EquipCell = eqMng.getCellByIdx(0);
    // 	this.m_pSkillBtn1.m_pNumLab.visible = cell != null;
    // 	if (cell) {
    // 		this.m_pSkillBtn1.m_pNumLab.text = cell.count.toString();
    // 		this.m_pSkillBtn1.m_pSkillImg.texture = EquipmentRes.getUIBtnTexture(cell.equipmentType);
    // 	} else {
    // 		this.m_pSkillBtn1.m_pNumLab.text = "0";
    // 		this.m_pSkillBtn1.m_pSkillImg.texture = RES.getRes("combatBoomUI2_json.combatBoom_btnQue");
    // 	}
    // 	cell = eqMng.getCellByIdx(1);
    // 	this.m_pSkillBtn2.m_pNumLab.visible = cell != null;
    // 	if (cell) {
    // 		this.m_pSkillBtn2.m_pNumLab.text = cell.count.toString();
    // 		this.m_pSkillBtn2.m_pSkillImg.texture = EquipmentRes.getUIBtnTexture(cell.equipmentType);
    // 	} else {
    // 		this.m_pSkillBtn2.m_pNumLab.text = "0";
    // 		this.m_pSkillBtn2.m_pSkillImg.texture = RES.getRes("combatBoomUI2_json.combatBoom_btnQue");
    // 	}
    // 	cell = eqMng.getCellByIdx(2);
    // 	this.m_pSkillBtn3.visible = cell != null;
    // 	if (cell) {
    // 		this.m_pSkillBtn3.m_pNumLab.text = cell.count.toString();
    // 		this.m_pSkillBtn3.m_pSkillImg.texture = EquipmentRes.getUIBtnTexture(cell.equipmentType);
    // 	} else {
    // 		this.m_pSkillBtn3.m_pNumLab.text = "0";
    // 		this.m_pSkillBtn3.m_pSkillImg.texture = RES.getRes("combatBoomUI2_json.combatBoom_btnQue");
    // 	}
    // }
    // /**获取队伍消息 */
    // private getTeamMsg(e: GameModEvent) {
    // 	let gameModTeam: GameMod_Team = e.gameMod as GameMod_Team;
    // 	CombatModel.getInstance.setTeamPlayerMsg(gameModTeam);
    // 	this.m_pGameModTeam = gameModTeam;
    // 	let player: RoleData = MapManager.getInstance().getPlayer().data;
    // 	switch (gameModTeam.gameStep) {
    // 		case GameStep.WAIT:
    // 			this.m_pRoundImg.visible = false;
    // 			this.m_pCombatStartGroup.visible = false;
    // 			break;
    // 		case GameStep.PREPARE:
    // 			this.setRoundImg(gameModTeam.roundIdx, this.m_pRoundImg, "combatBoomUI_json.combatBoom_endFont_0");
    // 			this.setTeamPlayerMsg(gameModTeam);
    // 			this.m_pCombatStartGroup.visible = true;
    // 			this.m_pLastTimeGroup.visible = true;
    // 			this.reStartTick();
    // 			break;
    // 		case GameStep.FIGHT:
    // 			this.setRoundImg(gameModTeam.roundIdx, this.m_pRoundImg, "combatBoomUI_json.combatBoom_endFont_0");
    // 			this.gameTick();
    // 			this.m_pCombatStartGroup.visible = false;
    // 			this.m_pLastTimeGroup.visible = false;
    // 			this.reStartTick();
    // 			break;
    // 		case GameStep.END:
    // 			this.setRoundImg(gameModTeam.roundIdx, this.m_pRoundImg, "combatBoomUI_json.combatBoom_endFont_0");
    // 			this.removeGameTick();
    // 			this.endHint(gameModTeam.roundWinner, gameModTeam.roundIdx);
    // 			break;
    // 	}
    // 	this.setBoomNum();
    // 	this.setTeamScore(gameModTeam);
    // }
    /**游戏倒计时开始 */
    CombatControlView.prototype.gameTick = function () {
        core.TimerManager.instance.addTick(1000, 0, this.timeRun, this);
        this.timeRun();
    };
    /**游戏倒计时关闭 */
    CombatControlView.prototype.removeGameTick = function () {
        core.TimerManager.instance.removeTick(this.timeRun, this);
    };
    /**准备开始倒计时开始 */
    CombatControlView.prototype.reStartTick = function () {
        core.TimerManager.instance.addTick(1000, 0, this.startLastTime, this);
        this.startLastTime();
    };
    /**准备开始倒计时关闭 */
    CombatControlView.prototype.removeReStartTick = function () {
        core.TimerManager.instance.removeTick(this.startLastTime, this);
    };
    /**准备开始倒计时方法 */
    CombatControlView.prototype.startLastTime = function () {
        // core.SoundUtils.getInstance().playSound('7');
        // let time = Math.ceil((this.m_pGameModTeam.roundStartTime - RoomModel.instance().getPastTime()) * 0.001);
        // if (time) {
        // 	this.m_pLastTime = time;
        // 	if (this.m_pLastTime < 0) {
        // 		this.m_pLastTime = 0;
        // 		this.removeReStartTick();
        // 	}
        // 	this.m_pLastTimeLab.text = this.m_pLastTime + "";
        // }
    };
    /**游戏结束 */
    CombatControlView.prototype.gameOver = function () {
        core.TimerManager.instance.removeTick(this.timeRun, this);
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.GAMEOVER));
    };
    /**回合结算提示 */
    // private endHint(teamData: TeamData, round: number) {
    // 	this.m_pEndGroup.visible = true;
    // 	this.m_pWinGroup.visible = false;
    // 	this.m_pDeuceGroup.visible = false;
    // 	this.m_pLostGroup.visible = false;
    // 	let player: RoleData = MapManager.getInstance().getPlayer().data;
    // 	if (teamData) {
    // 		if (player.teamID == teamData.teamID) {
    // 			this.m_pWinGroup.visible = true;
    // 		} else {
    // 			this.m_pLostGroup.visible = true;
    // 		}
    // 	} else {
    // 		this.m_pDeuceGroup.visible = true;
    // 	}
    // 	this.setRoundImg(round, this.m_pEndRoundImg, "combatBoomUI_json.combat_roundFont_0")
    // }
    CombatControlView.prototype.setRoundImg = function (round, img, imgName) {
        // combatBoomUI_json.combat_roundFont_01
        // 	img.source = "combatBoomUI_json.combatBoom_endFont_01";
        if (round == 0)
            return;
        img.source = imgName + round + "";
    };
    /**改变旗位置 */
    CombatControlView.prototype.changeFlagPoint = function (evt) {
        // let data: any = evt.messageData;
        // let player: RoleData = MapManager.getInstance().getPlayer().data;
        // let gameMod: GameMod_Team = this.m_pGameModTeam;
        // let role: RoleObject = MapManager.getInstance().getRoleById(data.id)
        // if (role.data.teamID == player.teamID) {
        // 	this.setFlag(data, this.m_pMyTeamArr);
        // } else
        // 	if (role.data.teamID != player.teamID && role.data.teamTag == 1) {
        // 		this.setFlag(data, this.m_pEnemyTeamArr1);
        // 	} else if (role.data.teamID != player.teamID && role.data.teamTag == 2) {
        // 		this.setFlag(data, this.m_pEnemyTeamArr2);
        // 	}
    };
    CombatControlView.prototype.setFlag = function (data, arr) {
        // let role: RoleObject = MapManager.getInstance().getRoleById(data.id)
        // let roleData: RoleData = role.data;
        // let player = MapManager.getInstance().getPlayer();
        // if (data.isShow) {
        // 	arr.visible = true;
        // 	arr.x = data.x;
        // 	arr.y = data.y;
        // 	arr.rotation = GameUtil.pointAmongAngle(player.x, player.y, role.x, role.y);
        // } else {
        // 	arr.visible = false;
        // }
    };
    return CombatControlView;
}(core.EUIComponent));
__reflect(CombatControlView.prototype, "CombatControlView");
//# sourceMappingURL=CombatControlView.js.map