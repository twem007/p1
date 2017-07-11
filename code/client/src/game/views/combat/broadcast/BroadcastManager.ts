class BroadcastManager {
	public constructor() {
	}
	/**全部击杀消息包括双方名字的数组 */
	public m_pAllKillData = [];
	/**控制显示击杀的初始显示 */
	public m_pIsAllKill: boolean = true;

	/**连杀消息包括杀手名字和连杀数 */
	public m_pKillData = [];
	/**控制连杀广播 */
	public m_pIsKill: boolean = true;

	private static s_instance: BroadcastManager;
	//BroadcastManager单例
	public static get getInstance(): BroadcastManager {
		if (!BroadcastManager.s_instance) {
			BroadcastManager.s_instance = new BroadcastManager();
		}
		return BroadcastManager.s_instance;
	}
	public m_pKillSelfLab: eui.Label;
	public m_pKillerLab: eui.Label;
	public m_pDeadLab: eui.Label;
	public m_pKillGroup: eui.Group;
	public m_pKillSelfGroup: eui.Group;
	public m_pKillLeftGroup: eui.Group;
	public m_pKillRightGroup: eui.Group;
	public m_pKillImg: eui.Image;
	public m_pKillerImg: eui.Image;
	public m_pDeadImg: eui.Image;
	public m_pKillSelfImg: eui.Image
	public setKillMsg() {
		if (!this.m_pKillSelfLab) return;
		let killSelfLab: eui.Label = this.m_pKillSelfLab;
		let killerLab: eui.Label = this.m_pKillerLab;
		let deadLab: eui.Label = this.m_pDeadLab;
		let killGroup: eui.Group = this.m_pKillGroup;
		let killSelfGroup: eui.Group = this.m_pKillSelfGroup;
		let killLeftGroup: eui.Group = this.m_pKillLeftGroup;
		let killRightGroup: eui.Group = this.m_pKillRightGroup;
		let killImg: eui.Image = this.m_pKillImg;
		let killerImg: eui.Image = this.m_pKillerImg;
		let deadImg: eui.Image = this.m_pDeadImg;
		let killSelfImg: eui.Image = this.m_pKillSelfImg;
		if (this.m_pAllKillData.length > 0) {
			// let killer: com_main.RoleObject = this.m_pAllKillData[0].killer;
			// let loser: com_main.RoleObject = this.m_pAllKillData[0].loser;
			let killer = null;
			let loser = null;
			killSelfLab.text = killer.data.name;
			killerLab.text = killer.data.name;
			deadLab.text = loser.data.name;
			// let player = com_main.MapManager.getInstance().getPlayer();
			let player = null;
			if (player.data.teamID == killer.data.teamID) {
				killSelfImg.source = "combatBoomUI_json.combatBoom_faceIcon_blue";
				killerImg.source = "combatBoomUI_json.combatBoom_faceIcon_blue";
				killerLab.textColor = 0x00AFCA;
				killSelfLab.textColor = 0x00AFCA;
			} else {
				killSelfImg.source = "combatBoomUI_json.combatBoom_faceIcon_red";
				killerImg.source = "combatBoomUI_json.combatBoom_faceIcon_red";
				killerLab.textColor = 0xF77B86;
				killSelfLab.textColor = 0xF77B86;
			}

			if (player.data.teamID == loser.data.teamID) {
				deadImg.source = "combatBoomUI_json.combatBoom_faceIcon_blue";
				deadLab.textColor = 0x00AFCA;
			} else {
				deadImg.source = "combatBoomUI_json.combatBoom_faceIcon_red";
				deadLab.textColor = 0xF77B86;
			}

			if (killer.data.battleID == loser.data.battleID) {
				egret.Tween.removeTweens(killSelfGroup);
				killSelfGroup.visible = true;
				killSelfGroup.alpha = 1;
				killSelfGroup.x = -(killSelfGroup.width);
				egret.Tween.get(killSelfGroup).to({ x: 463 }, 300, egret.Ease.backInOut).to({ alpha: 0 }, 2000, egret.Ease.backInOut).call(() => (this.m_pAllKillData.shift(), killSelfGroup.visible = false, this.callSetChangeKillMsg()));
			} else {
				egret.Tween.removeTweens(killGroup);
				egret.Tween.removeTweens(killLeftGroup);
				egret.Tween.removeTweens(killRightGroup);
				egret.Tween.removeTweens(killImg);
				killGroup.visible = true;
				killGroup.alpha = 1;
				killImg.alpha = 0;
				killImg.scaleX = 2;
				killImg.scaleY = 2;
				killLeftGroup.x = -(killLeftGroup.width);
				killRightGroup.x = core.LayerCenter.stageWidth;
				egret.Tween.get(killGroup).wait(2000).to({ alpha: 0 }, 500, egret.Ease.backInOut).call(() => (this.m_pAllKillData.shift(), killGroup.visible = false, this.callSetChangeKillMsg()));
				egret.Tween.get(killLeftGroup).to({ x: 0 }, 300, egret.Ease.backInOut);
				egret.Tween.get(killRightGroup).to({ x: 446 }, 300, egret.Ease.backInOut);
				egret.Tween.get(killImg).wait(300).to({ alpha: 1, scaleX: 0.8, scaleY: 0.8 }, 200, egret.Ease.backInOut).to({ scaleX: 1, scaleY: 1 }, 50);
			}

		}
	}
	/**根据队列回调广播 */
	private callSetChangeKillMsg() {
		if (this.m_pAllKillData.length >= 1) {
			this.setKillMsg();
		} else {
			this.m_pIsAllKill = true;
		}
	}
	/**观战模式的点点点效果 */
	public seeModAnim(seeDot1: eui.Image, seeDot2: eui.Image, seeDot3: eui.Image) {
		let waitTime: number = 500;
		seeDot1.alpha = 0;
		seeDot2.alpha = 0;
		seeDot3.alpha = 0;
		egret.Tween.removeTweens(seeDot1);
		egret.Tween.get(seeDot1).wait(waitTime).call(() => (seeDot1.alpha = 1))
			.wait(waitTime).call(() => (seeDot2.alpha = 1))
			.wait(waitTime).call(() => (seeDot3.alpha = 1))
			.wait(500).call(() => (this.seeModAnim(seeDot1, seeDot2, seeDot3)));
	}
}