class LoginUI extends core.EUIComponent {
	/**主组 */
	private m_pMainGroup: eui.Group;
	/**背景图 */
	private m_pBgImg: eui.Image;
	/**logo组 */
	private m_pLogoGroup: eui.Group;
	/**logo图片 */
	private m_pLogo: eui.Image;
	/**账号密码组 */
	private m_pAccountGroup: eui.Group;
	/**账号 */
	private m_pAccount: eui.EditableText;
	/**密码 */
	private m_pPassword: eui.EditableText;
	/**登录按钮 */
	private m_pLoginBtn: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/login/LoginsSkin.exml";
	}
	protected onShow(): void {
		super.onShow();
		let name = LocalData.getOpenId();
		this.m_pAccount.text = name;//"N" + Utils.randomInt(1,10000);
		LocalData.setOpenId(name);
		// PlayerModel.mIdName = name;
		this.btnCache();
		this.soundCache();
		this.qualityCache();
	}
	protected addListener() {
		super.addListener();
		this.m_pAccount.addEventListener(egret.Event.CHANGE, this.onChange, this);
		this.m_pLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this.m_pPassword.addEventListener(egret.Event.CHANGE, this.onChangePassword, this);
	}
	protected removeListener(): void {
		super.removeListener();
		this.m_pAccount.removeEventListener(egret.Event.CHANGE, this.onChange, this);
		this.m_pLoginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
		this.m_pPassword.removeEventListener(egret.Event.CHANGE, this.onChangePassword, this);
	}
	/**更新舞台 */
	public onAdaptive() {
		UIManager.updataPoint(this.m_pLogoGroup, 668, 308);
		UIManager.updataPoint(this.m_pAccountGroup, 668, 334);
		UIManager.updataPoint(this.m_pLoginBtn, 667, 614);
	}
	public release() {
	}
	private onChange(evt: egret.Event): void {
		LocalData.setOpenId(this.m_pAccount.text);
		// PlayerModel.mIdName = this.m_pAccount.text;
	}

	private onButtonClick(event: egret.TouchEvent): void {
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
			this.m_pAccountGroup.visible = true
			this.m_pLoginBtn.source = "logoBoomUI_json.loading_btn_1";
			// }
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


	}
	/*控制密码输入长度**/
	private onChangePassword() {
		let password: string = this.m_pPassword.text;
		if (password.length >= 20) {
			password = password.substring(0, 20);
			this.m_pPassword.text = password;
		}
	}
	private btnCache() {
		/**按钮缓存初始化 */
		let throughBtnData = LocalData.getBtnPointFirst();
		let throughData = throughBtnData.split(",");
		SkillBtnData.m_pThroughBtnSetPoint.x = parseInt(throughData[0]);
		SkillBtnData.m_pThroughBtnSetPoint.y = parseInt(throughData[1]);

		let speedBtnData = LocalData.getBtnPointSecond();
		let speedData = speedBtnData.split(",");
		SkillBtnData.m_pSpeedBtnSetPoint.x = parseInt(speedData[0]);
		SkillBtnData.m_pSpeedBtnSetPoint.y = parseInt(speedData[1]);

		let throughBtnScaleData = LocalData.getBtnScaleFirst();
		SkillBtnData.m_pThroughBtnScale = parseFloat(throughBtnScaleData);

		SkillBtnData.m_pThroughBlockValue = (SkillBtnData.m_pThroughBtnScale - (1 - SkillBtnData.m_pScaling * 10)) / SkillBtnData.m_pScaling;

		let speedBtnScaleData = LocalData.getBtnScaleSecond();
		SkillBtnData.m_pSpeedBtnScale = parseFloat(speedBtnScaleData);
		SkillBtnData.m_pSpeedBlockValue = (SkillBtnData.m_pSpeedBtnScale - (1 - SkillBtnData.m_pScaling * 10)) / SkillBtnData.m_pScaling;

		let btnAlphaData = LocalData.getBtnAlpha();
		SkillBtnData.m_pSkillBtnAlpha = parseFloat(btnAlphaData);
		SkillBtnData.m_pSkillAlphaBlockValue = (1 - SkillBtnData.m_pSkillBtnAlpha) / SkillBtnData.m_pAlphaRatio;


	}
	/**音乐缓存初始化 */
	private soundCache() {
		/**音乐缓存初始化 */
		let musicSize: string = LocalData.getMusicSize();
		SoundViewData.m_pMusicBlockValue = parseInt(musicSize);

		let isMusic: string = LocalData.getIsMusic();
		SoundViewData.m_pIsMusic = parseInt(isMusic);

		let soundSize: string = LocalData.getSoundSize();
		SoundViewData.m_pSoundBlockValue = parseInt(soundSize);

		let isSound: string = LocalData.getIsSound();
		SoundViewData.m_pIsSound = parseInt(isSound);

		if (SoundViewData.m_pIsMusic == 1) {
			SoundUtils.getInstance().setBGMValume(parseInt(musicSize) * 0.1);
		} else {
			SoundUtils.getInstance().setBGMValume(0);
		}

		if (SoundViewData.m_pIsSound == 1) {
			SoundUtils.getInstance().setEffectValume(parseInt(soundSize) * 0.1);
		} else {
			SoundUtils.getInstance().setEffectValume(0);
		}
	}
	/**画质缓存初始化 */
	private qualityCache() {
		// let quality = LocalData.getQuality();
		// if (quality == PictureQualityLevel.high + "") {
		//     GamePictureQuality.change(PictureQualityLevel.high);
		// } else if (quality == PictureQualityLevel.middle + "") {
		//     GamePictureQuality.change(PictureQualityLevel.middle);
		// } else {
		//     GamePictureQuality.change(PictureQualityLevel.low);
		// }
	}


}