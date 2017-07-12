var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/login/LoginsSkin.exml";
        return _this;
    }
    LoginUI.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        var name = LocalData.getOpenId();
        this.m_pAccount.text = name; //"N" + Utils.randomInt(1,10000);
        LocalData.setOpenId(name);
        // PlayerModel.mIdName = name;
        this.btnCache();
        this.soundCache();
        this.qualityCache();
    };
    LoginUI.prototype.addListener = function () {
        _super.prototype.addListener.call(this);
        this.m_pAccount.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.m_pLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.m_pPassword.addEventListener(egret.Event.CHANGE, this.onChangePassword, this);
    };
    LoginUI.prototype.removeListener = function () {
        _super.prototype.removeListener.call(this);
        this.m_pAccount.removeEventListener(egret.Event.CHANGE, this.onChange, this);
        this.m_pLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.m_pPassword.removeEventListener(egret.Event.CHANGE, this.onChangePassword, this);
    };
    /**更新舞台 */
    LoginUI.prototype.onAdaptive = function () {
        UIManager.updataPoint(this.m_pLogoGroup, 668, 308);
        UIManager.updataPoint(this.m_pAccountGroup, 668, 334);
        UIManager.updataPoint(this.m_pLoginBtn, 667, 614);
    };
    LoginUI.prototype.release = function () {
    };
    LoginUI.prototype.onChange = function (evt) {
        LocalData.setOpenId(this.m_pAccount.text);
        // PlayerModel.mIdName = this.m_pAccount.text;
    };
    LoginUI.prototype.onButtonClick = function (event) {
        if (this.m_pLogoGroup.visible) {
            // if (SDK.pf) {
            // 	let server: ServerInfo = SDK.server;
            // 	if (server) {
            // 		let data: ServerData = SDK.enterServer;
            // 		if (data) {
            // 			if (server.check(data)) {
            // 				AGame.HttpClient.serverUrl = `http://${data.host}:${data.port}/`;
            // 				AGame.R.notifyView(LoginNav.LOGIN_LOGOPEN);
            // 			} else {
            // 				com_main.CommonHintView.m_pText = `${data.updateMSG}`;
            // 				com_main.CommonHintView.m_pCondition = CommonReturnType.BUTTON_RESGAME;
            // 				AGame.R.notifyView(HintNav.COMMON_OPEN);
            // 			}
            // 			return;
            // 		}
            // 	}
            // CommonHintView.m_pText = "当前没有服务器开放";
            // CommonHintView.m_pCondition = CommonReturnType.BUTTON_RESGAME;
            // core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.COMMON));
            // } else {
            this.m_pLogoGroup.visible = false;
            this.m_pAccountGroup.visible = true;
            this.m_pLoginBtn.source = "logoBoomUI_json.loading_btn_1";
        }
        else {
            if (this.m_pAccount.text != null && this.m_pAccount.text != "") {
                this.release();
                core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.LOGIN));
                core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.MAINUI));
            }
            else {
                core.TextUtils.hintLabel("请输入账号");
            }
        }
    };
    /*控制密码输入长度**/
    LoginUI.prototype.onChangePassword = function () {
        var password = this.m_pPassword.text;
        if (password.length >= 20) {
            password = password.substring(0, 20);
            this.m_pPassword.text = password;
        }
    };
    LoginUI.prototype.btnCache = function () {
        /**按钮缓存初始化 */
        var throughBtnData = LocalData.getBtnPointFirst();
        var throughData = throughBtnData.split(",");
        SkillBtnData.m_pThroughBtnSetPoint.x = parseInt(throughData[0]);
        SkillBtnData.m_pThroughBtnSetPoint.y = parseInt(throughData[1]);
        var speedBtnData = LocalData.getBtnPointSecond();
        var speedData = speedBtnData.split(",");
        SkillBtnData.m_pSpeedBtnSetPoint.x = parseInt(speedData[0]);
        SkillBtnData.m_pSpeedBtnSetPoint.y = parseInt(speedData[1]);
        var throughBtnScaleData = LocalData.getBtnScaleFirst();
        SkillBtnData.m_pThroughBtnScale = parseFloat(throughBtnScaleData);
        SkillBtnData.m_pThroughBlockValue = (SkillBtnData.m_pThroughBtnScale - (1 - SkillBtnData.m_pScaling * 10)) / SkillBtnData.m_pScaling;
        var speedBtnScaleData = LocalData.getBtnScaleSecond();
        SkillBtnData.m_pSpeedBtnScale = parseFloat(speedBtnScaleData);
        SkillBtnData.m_pSpeedBlockValue = (SkillBtnData.m_pSpeedBtnScale - (1 - SkillBtnData.m_pScaling * 10)) / SkillBtnData.m_pScaling;
        var btnAlphaData = LocalData.getBtnAlpha();
        SkillBtnData.m_pSkillBtnAlpha = parseFloat(btnAlphaData);
        SkillBtnData.m_pSkillAlphaBlockValue = (1 - SkillBtnData.m_pSkillBtnAlpha) / SkillBtnData.m_pAlphaRatio;
    };
    /**音乐缓存初始化 */
    LoginUI.prototype.soundCache = function () {
        /**音乐缓存初始化 */
        var musicSize = LocalData.getMusicSize();
        SoundViewData.m_pMusicBlockValue = parseInt(musicSize);
        var isMusic = LocalData.getIsMusic();
        SoundViewData.m_pIsMusic = parseInt(isMusic);
        var soundSize = LocalData.getSoundSize();
        SoundViewData.m_pSoundBlockValue = parseInt(soundSize);
        var isSound = LocalData.getIsSound();
        SoundViewData.m_pIsSound = parseInt(isSound);
        if (SoundViewData.m_pIsMusic == 1) {
            SoundUtils.getInstance().setBGMValume(parseInt(musicSize) * 0.1);
        }
        else {
            SoundUtils.getInstance().setBGMValume(0);
        }
        if (SoundViewData.m_pIsSound == 1) {
            SoundUtils.getInstance().setEffectValume(parseInt(soundSize) * 0.1);
        }
        else {
            SoundUtils.getInstance().setEffectValume(0);
        }
    };
    /**画质缓存初始化 */
    LoginUI.prototype.qualityCache = function () {
        // let quality = LocalData.getQuality();
        // if (quality == PictureQualityLevel.high + "") {
        //     GamePictureQuality.change(PictureQualityLevel.high);
        // } else if (quality == PictureQualityLevel.middle + "") {
        //     GamePictureQuality.change(PictureQualityLevel.middle);
        // } else {
        //     GamePictureQuality.change(PictureQualityLevel.low);
        // }
    };
    return LoginUI;
}(core.EUIComponent));
__reflect(LoginUI.prototype, "LoginUI");
//# sourceMappingURL=LoginUI.js.map