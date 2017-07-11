var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**无尽模式结束界面 */
var GameOverHintView = (function (_super) {
    __extends(GameOverHintView, _super);
    function GameOverHintView() {
        var _this = _super.call(this) || this;
        _this.m_pProNum = 0;
        /**左队分数 */
        _this.m_pGetLeftScore = 0;
        /**右队分数 */
        _this.m_pGetRightScore = 0;
        // public m_pGameMode: GameMod_Team;
        _this.m_pLeftPlayerList = [];
        _this.m_pRightPlayerList = [];
        _this.skinName = "resource/skins/gameover/GameOverHintSkin.exml";
        return _this;
    }
    GameOverHintView.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.initState();
    };
    GameOverHintView.prototype.addListener = function () {
        _super.prototype.addListener.call(this);
        this.m_pMainBtnImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMainBtn, this);
    };
    /**删除View对象事件 */
    GameOverHintView.prototype.removeListener = function () {
        _super.prototype.removeListener.call(this);
        this.m_pMainBtnImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMainBtn, this);
    };
    GameOverHintView.prototype.onAdaptive = function () {
        UIManager.updataPoint(this.m_pBgGroup, 667, 375);
        UIManager.updataPoint(this.m_pRoundEndGroup, 667, 361);
        UIManager.changeSizeByWidth(this.m_pRoundEndGroup, 1);
    };
    GameOverHintView.prototype.release = function () {
    };
    /**初始化信息 */
    GameOverHintView.prototype.initState = function () {
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
    };
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
    GameOverHintView.prototype.onClickMainBtn = function () {
        egret.log("回到主界面");
        // MapManager.getInstance().backLobby();
    };
    return GameOverHintView;
}(core.EUIComponent));
__reflect(GameOverHintView.prototype, "GameOverHintView");
//# sourceMappingURL=GameOverHintView.js.map