class MainUI extends core.EUIComponent {
	/**背景底图 */
	public m_pBgImg: eui.Image;
	/**右上角组 */
	public m_pRightTow: eui.Group;
	/**设置按钮 */
	public m_pGameSetBtn: EntranceBtn;
	/**邮件按钮 */
	public m_pMailBtn: EntranceBtn;
	/**右下组 */
	public m_pRightLowGroup: eui.Group;
	/**英雄按钮 */
	public m_pHeroBtn: EntranceBtn;
	/**碎片按钮 */
	public m_pChipBtn: EntranceBtn;
	/**背包按钮 */
	public m_pBagBtn: EntranceBtn;
	/**好友按钮 */
	public m_pFriendBtn: EntranceBtn;
	/**成长按钮 */
	public m_pGrowUpBtn: EntranceBtn;
	/**货币组件 */
	public m_pCurrency: Currency;
	/**网络延迟组件 */
	public m_pLinkDelay: LinkDelay;
	/**选择模式组 */
	public m_pModleBtnGroup: eui.Group;
	/**排位赛按钮 */
	public m_pRankModleBtn: ModleBtn;
	/**排行榜组 */
	public m_pRankGroup: eui.Group;

	public constructor() {
		super();
		this.skinName = "resource/skins/main/MainSkin.exml";
	}
	protected onShow(): void {
		super.onShow();
		core.SoundUtils.getInstance().playSound('25', 0);
	}
	protected addListener() {
		super.addListener();
		this.m_pRankModleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRankBtn, this);
	}
	protected removeListener(): void {
		super.removeListener();
		this.m_pRankModleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRankBtn, this);

	}
	public onAdaptive() {
		UIManager.updataPoint(this.m_pBgImg, 667, 375);
		UIManager.rightTopAdaptive(this.m_pRightTow, 866, 45);
		UIManager.rightBelowAdaptive(this.m_pRightLowGroup, 1067, 704);
		UIManager.leftBelowAdaptive(this.m_pRankGroup, 59, 543);
		UIManager.updataPoint(this.m_pModleBtnGroup, 1017, 378);

	}
	public release() {
	}

	private onClickRankBtn() {
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.MAINUI));
		GameModeManager.getInstance().enterGame(GameTypeEnum.EXERCISE);
	}
	private onButtonClick(event: egret.TouchEvent): void {
		switch (event.currentTarget) {
			// case this.m_pModEndlessGroup:
			//    RoomModel.instance().type = FightType.TEAM_BATTLE;
			//     RoomModel.instance().gameMod = GameMod_Team.instance;
			//     RoomModel.instance().reqProc = ReqProcessor_Net.instance;
			//     Bootstrap.content();
			//     if ((PlayerModel.operation & (1 << (7 - 1))) == 0) {
			//         LoginProxy.sendOperStep(7);
			//     } else {
			//         LoginProxy.sendOperStep(9);
			//     }
			// core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW,ModuleEnum.NOTICE));
			// 	break;
			// case this.m_pModTimeLimitGroup:
			//  if (LocalData.getGuidance() == LocalDataType.LOCALTYPETRUE) {
			//     LocalData.setGuidance(LocalDataType.LOCALTYPEFALSE);
			// }
			// //RoomModel.instance().type = FightType.STANDALONE;
			// RoomModel.instance().type = FightType.TEAM_BATTLE;
			// RoomModel.instance().gameMod = GameMod_Team.instance;
			// RoomModel.instance().reqProc = ReqProcessor_Local.instance;
			// LocalLogic.instance.gameModCtrl = TeamModCtrl.instance;
			// //RoomModel.instance().gameMod.init();
			// EventCenter.sendEvent(new ReqEvent(ReqEvent.CREATE_NEW_GAME));
			// if ((PlayerModel.operation & (1 << (2 - 1))) == 0) {
			//     LoginProxy.sendOperStep(2);
			// } else {
			//     LoginProxy.sendOperStep(4);
			// }
			// 	core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.MAINUI));
			// 	GameModeManager.getInstance().enterGame(GameTypeEnum.EXERCISE)
			// 	break;
			// case this.m_pModTeamGroup:
			// 	core.TextUtils.hintLabel("敬请期待");
			// core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW,ModuleEnum.NOTICEANIM));
			// break;
		}
	}

	// private onCombatDataCreated(e: GameModEvent) {
	// 	if (e.data && e.data.mapID) {
	// 		let mapID: number = e.data.mapID;
	// 		//this.enterFightView(mapID);
	// 		this.enterFightView(101);
	// 	} else {
	// 		let mapConfig: MapSelectionConfig = CC.MapSelectionConfig.getValBykey(3);
	// 		let mapPro: string = mapConfig.mapPro;
	// 		let mapArr = mapPro.split(",");
	// 		let mapProNum: number = 0;
	// 		for (let i = 0; i < mapArr.length; i++) {
	// 			mapProNum += parseInt(mapArr[i]);
	// 		}
	// 		let random = Math.random() * mapProNum;
	// 		let mapProSection: number = 0;
	// 		let index: number = 0;
	// 		for (var f = 0; f < mapArr.length; f++) {
	// 			let mapProSec = mapProSection;
	// 			mapProSection += parseInt(mapArr[f]);
	// 			if (mapProSec <= random && random < mapProSection) {
	// 				index = f;
	// 				break;
	// 			}
	// 		}
	// 		let mapID: string = mapConfig.mapId;
	// 		let mapIdArr = mapID.split(",");
	// 		// egret.log(parseInt(mapIdArr[index]));
	// 		// this.enterFightView(parseInt(mapIdArr[index]));
	// 		this.enterFightView(101);
	// 	}
	// }

	// private enterFightView(mapId): void {
	// 	EventTrack.sendEvent('����ս��', [{ 'ģʽ': RoomModel.instance().type.toString() }]);
	// 	SoundUtils.getInstance().stopSoundByID('25');
	// 	if (MapManager.getInstance().isInit) {
	// 		return;
	// 	}
	// 	AGame.R.notifyView(SceneNav.SCENE_MAIN_CLOSE);
	// 	AGame.R.notifyView(LoginNav.LOGIN_LOGOPEN, mapId);
	// }
	//  private createRoom(e: egret.Event) {
	//         let roomData: RoomModel = e.data;
	//         this.enterFightView(roomData.mapID);
	//     }

}