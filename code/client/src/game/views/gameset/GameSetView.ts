class GameSetView extends core.EUIComponent {
	public constructor() {
		super();
		this.skinName = "resource/skins/gameset/GameSetSkin.exml";
	}
	/**主控制组 */
	public m_pMainGroup: eui.Group;
	/**游戏设置界面按钮 */
	private m_pGameSetBtn: eui.Image;
	/**游戏操作设置界面按钮 */
	private m_pHandleSetBtn: eui.Image;
	/**游戏设置图片 */
	private m_pGameSetImg: eui.Image;
	/**游戏操作图片 */
	private m_pHandleSetImg: eui.Image;
	/**左箭头 */
	private m_pLeftArr: eui.Image;
	/**右箭头 */
	private m_pRightArr: eui.Image;
	/**关闭游戏设置界面按钮 */
	private m_pCloseBtn: eui.Group;
	/**设置音效组 */
	private m_pSoundGroup: eui.Group;
	/**背景音乐按钮 */
	private m_pMusicBtn: eui.Group;
	/**背景音乐选择图片 */
	private m_pMusicImg: eui.Image;
	/**音效按钮 */
	private m_pSoundBtn: eui.Group;
	/**音效图片 */
	private m_pSoundImg: eui.Image;
	/**游戏设置组 */
	private m_pGameSetGroup: eui.Group;
	/**镜像按钮 */
	private m_pMirroringBtn: eui.Image;
	/**重置按钮 */
	private m_pResBtn: eui.Image;
	/**穿越滑块 */
	private m_pThroughHSlider: eui.HSlider;
	/**速度滑块 */
	private m_pSpeedHSlider: eui.HSlider;
	/**按钮透明度滑块 */
	private m_pBtnAlphaHSlider: eui.HSlider;
	/**技能按钮组 */
	private m_pSkillBtnGroup: eui.Group;
	/**穿越按钮 */
	private m_pThroughBtn: eui.Image;
	/**速度按钮 */
	private m_pSpeedBtn: eui.Image;
	/**拖动技能背景图 */
	private m_pSkillBg: eui.Image;
	/**退出游戏按钮 */
	private m_pGameOutBtn: eui.Group;
	/**音乐滑块 */
	private m_pMusicHSlider: eui.HSlider;
	/**音效滑块 */
	private m_pSoundHSlider: eui.HSlider;
	/**画质高按钮 */
	public m_pQualityHightBtn: eui.Group;
	/**画质高勾图片 */
	public m_pHightImg: eui.Image;
	/**画质中按钮 */
	public m_pQualityMiddleBtn: eui.Group;
	/**画质中勾图片  */
	public m_pMiddleImg: eui.Image;
	/**画质低按钮 */
	public m_pQualityLowBtn: eui.Group;
	/**画质低勾图片 */
	public m_pLowImg: eui.Image;


	/**按钮移动范围下文本的高度 */
	private m_pLabHeight: number = 30;
	/**按钮移动范围背景的高度 */
	private m_pBgHeight: number = 262;
	/**按钮移动范围背景的宽度 */
	private m_pBgWidth: number = 1116;
	/**设置界面与战斗界面的比值 */
	private m_pProportion: number = 0.4;

	/**当前要拖动的技能图标 */
	private m_pSkillBtn: eui.Image;
	/**技能按钮组的文本 */
	private m_pSkillBtnLabe: eui.Label;
	/**初始化子对象 */
	protected onShow() {
		super.onShow();

		this.m_pSoundGroup.visible = true;
		this.m_pGameSetImg.visible = true;

		/**初始化按钮位置 */
		this.initBtnPoint(SkillBtnData.m_pSpeedBtnSetPoint, this.m_pSpeedBtn);
		this.initBtnPoint(SkillBtnData.m_pThroughBtnSetPoint, this.m_pThroughBtn);
		/**初始化按钮透明度大小 */
		this.m_pThroughBtn.scaleX = SkillBtnData.m_pThroughBtnScale;
		this.m_pThroughBtn.scaleY = SkillBtnData.m_pThroughBtnScale;
		this.m_pSpeedBtn.scaleX = SkillBtnData.m_pSpeedBtnScale;
		this.m_pSpeedBtn.scaleY = SkillBtnData.m_pSpeedBtnScale;
		this.m_pThroughBtn.alpha = SkillBtnData.m_pSkillBtnAlpha;
		this.m_pSpeedBtn.alpha = SkillBtnData.m_pSkillBtnAlpha;

		this.m_pThroughHSlider.value = SkillBtnData.m_pThroughBlockValue;
		this.m_pSpeedHSlider.value = SkillBtnData.m_pSpeedBlockValue;
		this.m_pBtnAlphaHSlider.value = SkillBtnData.m_pSkillAlphaBlockValue;
		/**初始化音效 */
		if (SoundViewData.m_pIsMusic == 1) {
			this.m_pMusicImg.visible = true;
		} else {
			this.m_pMusicImg.visible = false;
		}
		if (SoundViewData.m_pIsSound == 1) {
			this.m_pSoundImg.visible = true
		}
		else {
			this.m_pSoundImg.visible = false;
		}
		this.m_pMusicHSlider.value = SoundViewData.m_pMusicBlockValue;
		this.m_pSoundHSlider.value = SoundViewData.m_pSoundBlockValue;

		/**画质 */
		this.m_pHightImg.visible = false;
		this.m_pMiddleImg.visible = false;
		this.m_pLowImg.visible = false;
		let quality = LocalData.getQuality();
		if (quality == PictureQualityLevel.high + "") {
			this.m_pHightImg.visible = true;
		} else if (quality == PictureQualityLevel.middle + "") {
			this.m_pMiddleImg.visible = true;
		} else {
			this.m_pLowImg.visible = true;
		}
	}

	/**初始化监听事件 */
	protected addListener() {
		super.addListener();
		/**游戏设置按 */
		this.m_pGameSetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGameSetBtn, this);
		/**游戏操作设置 */
		this.m_pHandleSetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandleBtn, this);
		/**关闭按钮 */
		this.m_pCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCloseBtn, this);
		/**音乐按钮 */
		this.m_pMusicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMusicBtn, this);
		/**音效按钮 */
		this.m_pSoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSoundBtn, this);
		/**镜像按钮 */
		this.m_pMirroringBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMirroringBtn, this);
		/**重置按钮 */
		this.m_pResBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickResBtn, this);
		/**穿越滑块 */
		this.m_pThroughHSlider.addEventListener(egret.Event.CHANGE, this.changeThroughHS, this);
		/**速度滑块 */
		this.m_pSpeedHSlider.addEventListener(egret.Event.CHANGE, this.changeSpeedHS, this);
		/**按钮透明度滑块 */
		this.m_pBtnAlphaHSlider.addEventListener(egret.Event.CHANGE, this.changeBtnAlpha, this);
		/**音乐滑块 */
		this.m_pMusicHSlider.addEventListener(egret.Event.CHANGE, this.changeMusicSize, this);
		/**音效滑块 */
		this.m_pSoundHSlider.addEventListener(egret.Event.CHANGE, this.changeSoundSize, this);
		/**拖动按钮背景组 */
		this.m_pSkillBtnGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClickSkillBtnGroup, this);
		this.m_pSkillBtnGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onClickSkillBtnGroupEnd, this);
		this.m_pSkillBtnGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onClickSkillBtnGroupEnd, this);
		this.m_pThroughBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickThroughBtnBegin, this);
		this.m_pSpeedBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickSpeedBtnBegin, this);
		/**退出游戏按钮 */
		this.m_pGameOutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGameOutBtn, this);
		/**画质按钮 */
		this.m_pQualityHightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQualityBtn, this);
		this.m_pQualityMiddleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQualityBtn, this);
		this.m_pQualityLowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQualityBtn, this);
	}
	/**删除监听 */
	protected removeListener() {
		super.removeListener();
		/**游戏设置按 */
		this.m_pGameSetBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGameSetBtn, this);
		/**游戏操作设置 */
		this.m_pHandleSetBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandleBtn, this);
		/**关闭按钮 */
		this.m_pCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCloseBtn, this);
		/**音乐按钮 */
		this.m_pMusicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMusicBtn, this);
		/**音效按钮 */
		this.m_pSoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSoundBtn, this);
		/**镜像按钮 */
		this.m_pMirroringBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMirroringBtn, this);
		/**重置按钮 */
		this.m_pResBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickResBtn, this);
		/**穿越滑块 */
		this.m_pThroughHSlider.removeEventListener(egret.Event.CHANGE, this.changeThroughHS, this);
		/**速度滑块 */
		this.m_pSpeedHSlider.removeEventListener(egret.Event.CHANGE, this.changeSpeedHS, this);
		/**按钮透明度滑块 */
		this.m_pBtnAlphaHSlider.removeEventListener(egret.Event.CHANGE, this.changeBtnAlpha, this);
		/**音乐滑块 */
		this.m_pMusicHSlider.addEventListener(egret.Event.CHANGE, this.changeMusicSize, this);
		/**音效滑块 */
		this.m_pSoundHSlider.addEventListener(egret.Event.CHANGE, this.changeSoundSize, this);
		/**拖动按钮背景组 */
		this.m_pSkillBtnGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onClickSkillBtnGroup, this);
		this.m_pSkillBtnGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClickSkillBtnGroupEnd, this);
		this.m_pSkillBtnGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onClickSkillBtnGroupEnd, this);
		this.m_pThroughBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickThroughBtnBegin, this);
		this.m_pSpeedBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickSpeedBtnBegin, this);

		/**退出游戏按钮 */
		this.m_pGameOutBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGameOutBtn, this);
		/**画质按钮 */
		this.m_pQualityHightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQualityBtn, this);
		this.m_pQualityMiddleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQualityBtn, this);
		this.m_pQualityLowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQualityBtn, this);
	}


	public onAdaptive() {
		//  UIManager.updataStageChangeObj(this.m_pSetMain,667,375,1,1); 
		UIManager.changeSizeByWidth(this.m_pMainGroup, 1);
		UIManager.updataPoint(this.m_pMainGroup, 667, 375);

	}
    public release() {
	}
	/**点击音乐按钮 */
	private onClickMusicBtn() {
		core.SoundUtils.getInstance().playSound('9');
		if (this.m_pMusicImg.visible == true) {
			this.m_pMusicImg.visible = false;
			SoundViewData.m_pIsMusic = 0;
			LocalData.setIsMusic("" + 0 + "");
		} else {
			this.m_pMusicImg.visible = true;
			SoundViewData.m_pIsMusic = 1;
			LocalData.setIsMusic("" + 1 + "");
		}
		if (SoundViewData.m_pIsMusic == 1) {
			core.SoundUtils.getInstance().setBGMValume((SoundViewData.m_pMusicBlockValue) * 0.1);
		}
		else {
			core.SoundUtils.getInstance().setBGMValume(0);
		}
	}
	/**点击音效按钮 */
	private onClickSoundBtn() {
		core.SoundUtils.getInstance().playSound('9');
		if (this.m_pSoundImg.visible == true) {
			this.m_pSoundImg.visible = false;
			SoundViewData.m_pIsSound = 0;
			LocalData.setIsSound("" + 0 + "");
		} else {
			this.m_pSoundImg.visible = true;
			SoundViewData.m_pIsSound = 1;
			LocalData.setIsSound("" + 1 + "");
		}
		if (SoundViewData.m_pIsSound == 1) {
			core.SoundUtils.getInstance().setEffectValume((SoundViewData.m_pSoundBlockValue) * 0.1);
		}
		else {
			core.SoundUtils.getInstance().setEffectValume(0);
		}
	}
	/**画质按钮 */
	private onClickQualityBtn(event: egret.TouchEvent) {
		// core.SoundUtils.getInstance().playSound('9');
		// switch (event.currentTarget) {
		// 	case this.m_pQualityHightBtn:
		// 		if (this.m_pHightImg.visible == true) return;
		// 		LocalData.setQuality(PictureQualityLevel.high + "");
		// 		this.m_pHightImg.visible = true;
		// 		this.m_pMiddleImg.visible = false;
		// 		this.m_pLowImg.visible = false;
		// 		GamePictureQuality.change(PictureQualityLevel.high);
		// 		break;
		// 	case this.m_pQualityMiddleBtn:
		// 		if (this.m_pMiddleImg.visible == true) return;
		// 		LocalData.setQuality(PictureQualityLevel.middle + "");
		// 		this.m_pHightImg.visible = false;
		// 		this.m_pMiddleImg.visible = true;
		// 		this.m_pLowImg.visible = false;
		// 		GamePictureQuality.change(PictureQualityLevel.middle);
		// 		break;
		// 	case this.m_pQualityLowBtn:
		// 		if (this.m_pLowImg.visible == true) return;
		// 		LocalData.setQuality(PictureQualityLevel.low + "");
		// 		this.m_pHightImg.visible = false;
		// 		this.m_pMiddleImg.visible = false;
		// 		this.m_pLowImg.visible = true;
		// 		GamePictureQuality.change(PictureQualityLevel.low);
		// 		break;
		// }
	}
	/**改变滑块时改变背景音量大小 */
	private changeMusicSize() {
		SoundViewData.m_pMusicBlockValue = this.m_pMusicHSlider.value;
		LocalData.setMusicSize("" + this.m_pMusicHSlider.value + "");
		if (SoundViewData.m_pIsMusic == 1) {
			core.SoundUtils.getInstance().setBGMValume((SoundViewData.m_pMusicBlockValue) * 0.1);
		} else {
			core.SoundUtils.getInstance().setBGMValume(0);
		}

	}
	/**改变滑块时改变音效音量大小 */
	private changeSoundSize() {
		SoundViewData.m_pSoundBlockValue = this.m_pSoundHSlider.value;
		LocalData.setSoundSize("" + this.m_pSoundHSlider.value + "");
		if (SoundViewData.m_pIsSound == 1) {
			core.SoundUtils.getInstance().setEffectValume((SoundViewData.m_pSoundBlockValue) * 0.1);
		} else {
			core.SoundUtils.getInstance().setEffectValume(0);
		}
	}
	/**点击游戏设置按 */
	private onClickGameSetBtn() {
		Log("点击游戏设置按钮");
		core.SoundUtils.getInstance().playSound('11');
		this.m_pGameSetImg.source = "setUI_json.set_font_03";
		this.m_pGameSetBtn.source = "setUI_json.set_btn_03";
		this.m_pHandleSetImg.source = "setUI_json.set_font_02";
		this.m_pHandleSetBtn.source = "setUI_json.set_btn_04";
		this.m_pLeftArr.visible = true;
		this.m_pRightArr.visible = false;
		this.m_pSoundGroup.visible = true;
		this.m_pGameSetGroup.visible = false;
	}
	/**点击游戏操作设置按钮 */
	private onClickHandleBtn() {
		Log("点击操作设置按钮");
		core.SoundUtils.getInstance().playSound('11');
		this.m_pGameSetImg.source = "setUI_json.set_font_01";
		this.m_pGameSetBtn.source = "setUI_json.set_btn_04";
		this.m_pHandleSetImg.source = "setUI_json.set_font_04";
		this.m_pHandleSetBtn.source = "setUI_json.set_btn_03";
		this.m_pLeftArr.visible = false;
		this.m_pRightArr.visible = true;
		this.m_pSoundGroup.visible = false;
		this.m_pGameSetGroup.visible = true;
	}
	/**点击关闭按钮 */
	private onClickCloseBtn() {
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, ModuleEnum.GAMESETUI))
	}

	/**点击镜像按钮 */
	private onClickMirroringBtn() {
		Log("点击镜像按钮");
		core.SoundUtils.getInstance().playSound('9');
		this.m_pThroughBtn.x = this.m_pSkillBg.width - this.m_pThroughBtn.x;
		this.m_pSpeedBtn.x = this.m_pSkillBg.width - this.m_pSpeedBtn.x;
		let throughBtnData = this.changeBtnPoint(SkillBtnData.m_pThroughBtnSetPoint, this.m_pThroughBtn);
		LocalData.setBtnPointFirst(throughBtnData);
		core.EventCenter.getInstance().sendEvent(new core.EventData(EventType.SET_THROUGH_POINT));

		let speedBtnData = this.changeBtnPoint(SkillBtnData.m_pSpeedBtnSetPoint, this.m_pSpeedBtn);
		LocalData.setBtnPointSecond(speedBtnData);
		core.EventCenter.getInstance().sendEvent(new core.EventData(EventType.SET_SPEED_POINT));

	}

	/**点击重置按钮 */
	private onClickResBtn() {
		core.SoundUtils.getInstance().playSound('9');
		let throughBtnData = this.initBtnPoint(SkillBtnData.m_pThroughBtnInitPoint, this.m_pThroughBtn);
		SkillBtnData.m_pThroughBtnSetPoint.x = SkillBtnData.m_pThroughBtnInitPoint.x;
		SkillBtnData.m_pThroughBtnSetPoint.y = SkillBtnData.m_pThroughBtnInitPoint.y;
		LocalData.setBtnPointFirst(throughBtnData);
		core.EventCenter.getInstance().sendEvent(new core.EventData(EventType.SET_THROUGH_POINT));
		let speedBtnData = this.initBtnPoint(SkillBtnData.m_pSpeedBtnInitPoint, this.m_pSpeedBtn);
		SkillBtnData.m_pSpeedBtnSetPoint.x = SkillBtnData.m_pSpeedBtnInitPoint.x;
		SkillBtnData.m_pSpeedBtnSetPoint.y = SkillBtnData.m_pSpeedBtnInitPoint.y;
		LocalData.setBtnPointSecond(speedBtnData);
		core.EventCenter.getInstance().sendEvent(new core.EventData(EventType.SET_SPEED_POINT));


	}
	/**改变穿越按钮大小 */
	private changeThroughHS() {
		let value = (1 - SkillBtnData.m_pScaling * 10) + this.m_pThroughHSlider.value * SkillBtnData.m_pScaling;
		this.m_pThroughBtn.scaleX = value;
		this.m_pThroughBtn.scaleY = value;
		SkillBtnData.m_pThroughBtnScale = value;
		SkillBtnData.m_pThroughBlockValue = this.m_pThroughHSlider.value;
		LocalData.setBtnScaleFirst("" + value + "");
		core.EventCenter.getInstance().sendEvent(new core.EventData(EventType.SET_THROUGH_SCALE));
	}
	/**改变速度按钮大小 */
	private changeSpeedHS() {
		let value = (1 - SkillBtnData.m_pScaling * 10) + this.m_pSpeedHSlider.value * SkillBtnData.m_pScaling;
		this.m_pSpeedBtn.scaleX = value;
		this.m_pSpeedBtn.scaleY = value;
		SkillBtnData.m_pSpeedBtnScale = value;
		SkillBtnData.m_pSpeedBlockValue = this.m_pSpeedHSlider.value;
		LocalData.setBtnScaleSecond("" + value + "");
		core.EventCenter.getInstance().sendEvent(new core.EventData(EventType.SET_SPEED_SCALE));
	}
	/**改变按钮透明度 */
	private changeBtnAlpha() {
		let value = 1 - this.m_pBtnAlphaHSlider.value * SkillBtnData.m_pAlphaRatio;
		this.m_pThroughBtn.alpha = value;
		this.m_pSpeedBtn.alpha = value;
		SkillBtnData.m_pSkillBtnAlpha = value;
		SkillBtnData.m_pSkillAlphaBlockValue = this.m_pBtnAlphaHSlider.value;
		LocalData.setBtnAlpha("" + value + "");
        core.EventCenter.getInstance().sendEvent(new core.EventData(EventType.SET_SKILLBTN_ALPHA));
	}

	/**点击设置界面拖动技能组 */
	private onClickSkillBtnGroup(e: egret.TouchEvent) {

		if (this.m_pSkillBtn) {
			let localX = e.localX;
			let localY = e.localY;
			localX = this.astrictX(localX, this.m_pSkillBtn);
			localY = this.astrictY(localY, this.m_pSkillBtn);
			this.m_pSkillBtn.x = localX;
			this.m_pSkillBtn.y = localY;
			if (this.m_pSkillBtn == this.m_pThroughBtn) {
				let throughBtnData = this.changeBtnPoint(SkillBtnData.m_pThroughBtnSetPoint, this.m_pSkillBtn);
				LocalData.setBtnPointFirst(throughBtnData);
				core.EventCenter.getInstance().sendEvent(new core.EventData(EventType.SET_THROUGH_POINT));
			} else if (this.m_pSkillBtn == this.m_pSpeedBtn) {
				let speedBtnData = this.changeBtnPoint(SkillBtnData.m_pSpeedBtnSetPoint, this.m_pSkillBtn);
				LocalData.setBtnPointSecond(speedBtnData);
				core.EventCenter.getInstance().sendEvent(new core.EventData(EventType.SET_SPEED_POINT));
			}
		}

	}
	/**改变按钮位置 */
	private changeBtnPoint(point: egret.Point, btnImg: eui.Image) {
		point.x = (this.m_pSkillBg.width - btnImg.x) * (UIManager.CONTENT_WIDTH / this.m_pSkillBg.width);
		// egret.log("输出的x坐标" + point.x);
		point.y = this.m_pSkillBg.height - btnImg.y;
		let BtnData = "" + point.x + "," + point.y + "";
		return BtnData;
	}
	/**初始按钮位置 */
	private initBtnPoint(point: egret.Point, btnImg: eui.Image) {
		btnImg.x = this.m_pSkillBg.width - (point.x / (UIManager.CONTENT_WIDTH / this.m_pSkillBg.width));
		btnImg.y = this.m_pSkillBg.height - point.y;
		let BtnData = "" + point.x + "," + point.y + "";
		return BtnData;
	}

	private onClickThroughBtnBegin() {
		this.m_pSkillBtn = this.m_pThroughBtn;
		this.m_pThroughBtn.touchEnabled = false;
		this.m_pSpeedBtn.touchEnabled = false;

	}
	private onClickSpeedBtnBegin() {
		this.m_pSkillBtn = this.m_pSpeedBtn;
		this.m_pSpeedBtn.touchEnabled = false;
		this.m_pThroughBtn.touchEnabled = false;
	}
	private onClickSkillBtnGroupEnd() {
		this.m_pThroughBtn.touchEnabled = true;
		this.m_pSpeedBtn.touchEnabled = true;
		this.m_pSkillBtn = null;
	}
	/**检查按钮可移动x范围 */
	private astrictX(localX: number, btnImg: eui.Image): number {
		if (localX <= btnImg.width * 0.5) {
			localX = btnImg.width * 0.5;
		}
		if (localX >= this.m_pSkillBtnGroup.width - (btnImg.width * 0.5)) {
			localX = this.m_pSkillBtnGroup.width - (btnImg.width * 0.5);
		}
		return localX;
	}
	/**检查按钮可移动y范围 */
	private astrictY(localY: number, btnImg: eui.Image): number {
		if (localY <= btnImg.height * 0.5) {
			localY = btnImg.height * 0.5;
		}
		if (localY >= this.m_pSkillBtnGroup.height - (btnImg.height * 0.5) - this.m_pSkillBtnLabe.height) {
			localY = this.m_pSkillBtnGroup.height - (btnImg.height * 0.5) - this.m_pSkillBtnLabe.height;
		}
		return localY;
	}

	/**按退出按钮 */
	private onClickGameOutBtn() {
		core.EventCenter.getInstance().addEventListener(EventType.SET_SPEED_POINT,this.onConnectClose,this);
		core.SoundUtils.getInstance().playSound('9');
		// MapManager.getInstance().destroy();
		// AGame.R.notifyView(RootNav.ROOT_CLOSE);
		// AGame.R.notifyView(SceneNav.SCENE_MAIN_OPEN);
		// AGame.CSocket.getInstance().close();
		// AGame.R.notifyView(HintNav.LINKHINT_OPEN);
	}

	private onConnectClose(): void {
		core.EventCenter.getInstance().removeEventListener(EventType.SET_SPEED_POINT,this.onConnectClose,this);
		core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE,ModuleEnum.LINK));
	}
}