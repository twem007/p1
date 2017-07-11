/**无尽模式结束界面 */
class GameOverHintView extends core.EUIComponent {
	public constructor() {
		super();
		this.skinName = "resource/skins/gameover/GameOverHintSkin.exml";
	}
	/**背景组 */
	private m_pBgGroup: eui.Group;
	/**主组 */
	private m_pRoundEndGroup: eui.Group;
	/**左装饰 */
	private m_pLeftDecorate: eui.Image;
	/**右装饰 */
	private m_pRightDecorate: eui.Image;
	/**左队分数底图 */
	private m_pLeftScoreBg: eui.Image;
	/**右队分数底图 */
	private m_pRightScoreBg: eui.Image;
	/**左队分数 */
	private m_pLeftTeamScore: eui.BitmapLabel;
	/**右队分数 */
	private m_pRightTeamScore: eui.BitmapLabel;
	/**左边1玩家的数据显示 */
	private m_pLeftPlayer1: RoundEndPlayerMsgItem;
	/**左边2玩家的数据显示 */
	private m_pLeftPlayer2: RoundEndPlayerMsgItem;
	/**右边1玩家的数据显示 */
	private m_pRightPlayer1: RoundEndPlayerMsgItem;
	/**右边2玩家的数据显示 */
	private m_pRightPlayer2: RoundEndPlayerMsgItem;
	/**最后一回合结束显示胜负的图片组 */
	private m_pEndHintGroup: eui.Group;
	/**赢得图片 */
	private m_pWinImg: eui.Image;
	/**平手图片 */
	private m_pDeuceImg: eui.Image;
	/**输的图片 */
	private m_pLostImg: eui.Image;
	/**主按钮图片 */
	private m_pMainBtnImg: eui.Image;

	private m_pProNum = 0;
	/**左队分数 */
	private m_pGetLeftScore: number = 0;
	/**右队分数 */
	private m_pGetRightScore: number = 0;

	// public m_pGameMode: GameMod_Team;

	public m_pLeftPlayerList: RoundEndPlayerMsgItem[] = [];
	public m_pRightPlayerList: RoundEndPlayerMsgItem[] = [];
	protected onShow() {
		super.onShow();
		this.initState();
	}
	protected addListener():void {
		super.addListener();
		this.m_pMainBtnImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMainBtn, this);
	}
	/**删除View对象事件 */
	protected removeListener() {
		super.removeListener();
		this.m_pMainBtnImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMainBtn, this);
	}
	public onAdaptive() {
		UIManager.updataPoint(this.m_pBgGroup, 667, 375);
		UIManager.updataPoint(this.m_pRoundEndGroup, 667, 361);
		UIManager.changeSizeByWidth(this.m_pRoundEndGroup, 1);
	}
	public release() {
	}
	/**初始化信息 */
	private initState() {
		this.m_pLeftPlayerList.push(this.m_pLeftPlayer1, this.m_pLeftPlayer2);
		this.m_pRightPlayerList.push(this.m_pRightPlayer1, this.m_pRightPlayer2);
		this.m_pLeftPlayer1.m_pMVP.visible = false;
		this.m_pLeftPlayer2.m_pMVP.visible = false;
		this.m_pRightPlayer1.m_pMVP.visible = false;
		this.m_pRightPlayer2.m_pMVP.visible = false;
		this.m_pLeftPlayer1.m_pAddFriend.visible = false;
		this.m_pLeftPlayer2.m_pAddFriend.visible = false;
		this.m_pRightPlayer1.m_pAddFriend.visible = false;
		this.m_pRightPlayer2.m_pAddFriend.visible = false;
	}
	// /**设置数据 */
	// public setData() {
	// 	let gameMod: GameMod_Team = this.m_pGameMode;
	// 	let player: RoleData = MapManager.getInstance().getPlayer().data;
	// 	if (player.teamID == 2) {
	// 		this.m_pLeftPlayer1.skinName = "RoundEndPlayerMsgSKin";
	// 		this.m_pLeftPlayer2.skinName = "RoundEndPlayerMsgSKin";
	// 		this.m_pRightPlayer1.skinName = "RoundEndPlayerMsgSKin1";
	// 		this.m_pRightPlayer2.skinName = "RoundEndPlayerMsgSKin1";
	// 		this.m_pLeftScoreBg.source = "roundEndUI_json.roundEndUI_scoreBg_1";
	// 		this.m_pRightScoreBg.source = "roundEndUI_json.roundEndUI_scoreBg";
	// 		this.m_pLeftTeamScore.font = "roundEndRedFont_fnt";
	// 		this.m_pRightTeamScore.font = "roundEndBlueFont_fnt";
	// 		this.m_pLeftDecorate.source = "roundEndUI_json.roundEndUI_Bg_04";
	// 		this.m_pLeftDecorate.skewY = 180;
	// 		this.m_pRightDecorate.source = "roundEndUI_json.roundEndUI_Bg_05";
	// 		this.m_pRightDecorate.skewY = 180;
	// 	}
	// 	this.setTeamScore(gameMod);
	// 	this.setTeamPlayerMsg(gameMod);
	// 	this.m_pMainBtnImg.touchEnabled = true;
	// 	this.showWinLose();

	// }
	// /**设置玩家的信息 */
	// private setTeamPlayerMsg(gameModTeam: GameMod_Team) {
	// 	let player: RoleData = MapManager.getInstance().getPlayer().data;
	// 	let teamList: TeamData[] = gameModTeam.teamList;
	// 	if (player.teamID == 1) {
	// 		for (var i = 0; i < teamList.length; i++) {
	// 			let memberList: RoleData[] = teamList[i].memberList;
	// 			for (var k = 0; k < memberList.length; k++) {
	// 				if (teamList[i].teamID == 1) {
	// 					let role: RoleData = memberList[k];
	// 					let leftPlayer = this.m_pLeftPlayerList[k];
	// 					leftPlayer.m_pBattleID = role.battleID;
	// 					leftPlayer.m_pPlayerName.text = role.name;
	// 					leftPlayer.m_pKillNum.text = gameModTeam.gameRecord.getRecordByID(role.battleID, GameRecord_Team.KILL) + "";
	// 					leftPlayer.m_pCaptureNum.text = gameModTeam.gameRecord.getRecordByID(role.battleID, GameRecord_Team.HURT) + "";
	// 					leftPlayer.m_pHelpNum.text = gameModTeam.gameRecord.getRecordByID(role.battleID, GameRecord_Team.SAVE) + "";
	// 					if (role.battleID == player.battleID) {
	// 						leftPlayer.m_pPlayerName.strokeColor = 0x496bc1;
	// 					}
	// 				} else if (teamList[i].teamID == 2) {
	// 					let role: RoleData = memberList[k];
	// 					let rightPlayer = this.m_pRightPlayerList[k];
	// 					rightPlayer.m_pBattleID = role.battleID;
	// 					rightPlayer.m_pPlayerName.text = role.name;
	// 					rightPlayer.m_pKillNum.text = gameModTeam.gameRecord.getRecordByID(role.battleID, GameRecord_Team.KILL) + "";
	// 					rightPlayer.m_pCaptureNum.text = gameModTeam.gameRecord.getRecordByID(role.battleID, GameRecord_Team.HURT) + "";
	// 					rightPlayer.m_pHelpNum.text = gameModTeam.gameRecord.getRecordByID(role.battleID, GameRecord_Team.SAVE) + "";
	// 					if (role.battleID == player.battleID) {
	// 						rightPlayer.m_pPlayerName.strokeColor = 0x496bc1;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// /**设置分数 */
	// private setTeamScore(gameModTeam: GameMod_Team) {
	// 	let leftTeamScore: number = CombatModel.getInstance.getTeamScore(gameModTeam, 1);
	// 	let rightTeamScore: number = CombatModel.getInstance.getTeamScore(gameModTeam, 2);
	// 	this.m_pLeftTeamScore.text = leftTeamScore + "";
	// 	this.m_pRightTeamScore.text = rightTeamScore + "";
	// 	this.m_pGetLeftScore = leftTeamScore;
	// 	this.m_pGetRightScore = rightTeamScore;
	// }
	// /**显示胜负 */
	// private showWinLose() {
	// 	let player: RoleData = MapManager.getInstance().getPlayer().data;
	// 	let leftScore: number = this.m_pGetLeftScore;
	// 	let rightScore: number = this.m_pGetRightScore;
	// 	if (player.teamID == 1) {
	// 		if (leftScore > rightScore) {
	// 			this.m_pWinImg.visible = true;
	// 			this.m_pDeuceImg.visible = false;
	// 			this.m_pLostImg.visible = false;
	// 		} else if (leftScore == rightScore) {
	// 			this.m_pWinImg.visible = false;
	// 			this.m_pDeuceImg.visible = true;
	// 			this.m_pLostImg.visible = false;
	// 		} else {
	// 			this.m_pWinImg.visible = false;
	// 			this.m_pDeuceImg.visible = false;
	// 			this.m_pLostImg.visible = true;
	// 		}
	// 	} else
	// 		if (player.teamID == 2) {
	// 			if (rightScore > leftScore) {
	// 				this.m_pWinImg.visible = true;
	// 				this.m_pDeuceImg.visible = false;
	// 				this.m_pLostImg.visible = false;
	// 			} else if (leftScore == rightScore) {
	// 				this.m_pWinImg.visible = false;
	// 				this.m_pDeuceImg.visible = true;
	// 				this.m_pLostImg.visible = false;
	// 			} else {
	// 				this.m_pWinImg.visible = false;
	// 				this.m_pDeuceImg.visible = false;
	// 				this.m_pLostImg.visible = true;
	// 			}
	// 		}
	// }
    /**按主按钮 */
	private onClickMainBtn() {
		egret.log("回到主界面");
		// MapManager.getInstance().backLobby();
	}

	// private onClickBtn(evt: egret.Event) {
	// 	switch (evt.currentTarget) {
	// 		case this.m_pBackBtn:

	// 			MapManager.getInstance().backLobby();
	// 			// MapManager.getInstance().destroy();

	// 			// AGame.R.notifyView(HintNav.GAMEOVER_CLOSE);
	// 			// AGame.R.notifyView(CombatNav.COMBAT_CONTROL_CLOSE);
	// 			// AGame.R.notifyView(SceneNav.SCENE_MAIN_OPEN);
	// 			break;
	// 		case this.m_pStartAgainBtn:
	// 			RoomModel.instance().gameMod.init();
	// 			MapManager.getInstance().playAgain();
	// 			// AGame.R.notifyView(HintNav.LINKHINT_OPEN);

	// 			// MapManager.getInstance().destroy();

	// 			// AGame.R.notifyView(HintNav.GAMEOVER_CLOSE);
	// 			// AGame.R.notifyView(CombatNav.COMBAT_CONTROL_CLOSE);
	// 			// AGame.R.notifyView(CombatNav.COMBAT_CONTROL_OPEN);
	// 			// MapManager.getInstance().enterMap(MapManager.getInstance().mapId);
	// 			if ((PlayerModel.operation & (1 << (2 - 1))) == 0) {
	// 				LoginProxy.sendOperStep(2);
	// 			} else {
	// 				LoginProxy.sendOperStep(4);
	// 			}
	// 			break;
	// 		case this.m_pFlauntBtn:
	// 			break;
	// 	}
	// }

	
}