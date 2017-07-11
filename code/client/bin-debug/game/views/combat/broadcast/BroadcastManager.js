var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BroadcastManager = (function () {
    function BroadcastManager() {
        /**全部击杀消息包括双方名字的数组 */
        this.m_pAllKillData = [];
        /**控制显示击杀的初始显示 */
        this.m_pIsAllKill = true;
        /**连杀消息包括杀手名字和连杀数 */
        this.m_pKillData = [];
        /**控制连杀广播 */
        this.m_pIsKill = true;
    }
    Object.defineProperty(BroadcastManager, "getInstance", {
        //BroadcastManager单例
        get: function () {
            if (!BroadcastManager.s_instance) {
                BroadcastManager.s_instance = new BroadcastManager();
            }
            return BroadcastManager.s_instance;
        },
        enumerable: true,
        configurable: true
    });
    BroadcastManager.prototype.setKillMsg = function () {
        var _this = this;
        if (!this.m_pKillSelfLab)
            return;
        var killSelfLab = this.m_pKillSelfLab;
        var killerLab = this.m_pKillerLab;
        var deadLab = this.m_pDeadLab;
        var killGroup = this.m_pKillGroup;
        var killSelfGroup = this.m_pKillSelfGroup;
        var killLeftGroup = this.m_pKillLeftGroup;
        var killRightGroup = this.m_pKillRightGroup;
        var killImg = this.m_pKillImg;
        var killerImg = this.m_pKillerImg;
        var deadImg = this.m_pDeadImg;
        var killSelfImg = this.m_pKillSelfImg;
        if (this.m_pAllKillData.length > 0) {
            // let killer: com_main.RoleObject = this.m_pAllKillData[0].killer;
            // let loser: com_main.RoleObject = this.m_pAllKillData[0].loser;
            var killer = null;
            var loser = null;
            killSelfLab.text = killer.data.name;
            killerLab.text = killer.data.name;
            deadLab.text = loser.data.name;
            // let player = com_main.MapManager.getInstance().getPlayer();
            var player = null;
            if (player.data.teamID == killer.data.teamID) {
                killSelfImg.source = "combatBoomUI_json.combatBoom_faceIcon_blue";
                killerImg.source = "combatBoomUI_json.combatBoom_faceIcon_blue";
                killerLab.textColor = 0x00AFCA;
                killSelfLab.textColor = 0x00AFCA;
            }
            else {
                killSelfImg.source = "combatBoomUI_json.combatBoom_faceIcon_red";
                killerImg.source = "combatBoomUI_json.combatBoom_faceIcon_red";
                killerLab.textColor = 0xF77B86;
                killSelfLab.textColor = 0xF77B86;
            }
            if (player.data.teamID == loser.data.teamID) {
                deadImg.source = "combatBoomUI_json.combatBoom_faceIcon_blue";
                deadLab.textColor = 0x00AFCA;
            }
            else {
                deadImg.source = "combatBoomUI_json.combatBoom_faceIcon_red";
                deadLab.textColor = 0xF77B86;
            }
            if (killer.data.battleID == loser.data.battleID) {
                egret.Tween.removeTweens(killSelfGroup);
                killSelfGroup.visible = true;
                killSelfGroup.alpha = 1;
                killSelfGroup.x = -(killSelfGroup.width);
                egret.Tween.get(killSelfGroup).to({ x: 463 }, 300, egret.Ease.backInOut).to({ alpha: 0 }, 2000, egret.Ease.backInOut).call(function () { return (_this.m_pAllKillData.shift(), killSelfGroup.visible = false, _this.callSetChangeKillMsg()); });
            }
            else {
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
                egret.Tween.get(killGroup).wait(2000).to({ alpha: 0 }, 500, egret.Ease.backInOut).call(function () { return (_this.m_pAllKillData.shift(), killGroup.visible = false, _this.callSetChangeKillMsg()); });
                egret.Tween.get(killLeftGroup).to({ x: 0 }, 300, egret.Ease.backInOut);
                egret.Tween.get(killRightGroup).to({ x: 446 }, 300, egret.Ease.backInOut);
                egret.Tween.get(killImg).wait(300).to({ alpha: 1, scaleX: 0.8, scaleY: 0.8 }, 200, egret.Ease.backInOut).to({ scaleX: 1, scaleY: 1 }, 50);
            }
        }
    };
    /**根据队列回调广播 */
    BroadcastManager.prototype.callSetChangeKillMsg = function () {
        if (this.m_pAllKillData.length >= 1) {
            this.setKillMsg();
        }
        else {
            this.m_pIsAllKill = true;
        }
    };
    /**观战模式的点点点效果 */
    BroadcastManager.prototype.seeModAnim = function (seeDot1, seeDot2, seeDot3) {
        var _this = this;
        var waitTime = 500;
        seeDot1.alpha = 0;
        seeDot2.alpha = 0;
        seeDot3.alpha = 0;
        egret.Tween.removeTweens(seeDot1);
        egret.Tween.get(seeDot1).wait(waitTime).call(function () { return (seeDot1.alpha = 1); })
            .wait(waitTime).call(function () { return (seeDot2.alpha = 1); })
            .wait(waitTime).call(function () { return (seeDot3.alpha = 1); })
            .wait(500).call(function () { return (_this.seeModAnim(seeDot1, seeDot2, seeDot3)); });
    };
    return BroadcastManager;
}());
__reflect(BroadcastManager.prototype, "BroadcastManager");
//# sourceMappingURL=BroadcastManager.js.map