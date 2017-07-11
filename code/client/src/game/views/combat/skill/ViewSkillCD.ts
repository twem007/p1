class ViewSkillCD {
	public constructor() {
		// // 游戏停止
		// core.EventCenter.getInstance().addEventListener(GameConst.GAME_PAUSE, this.gamePause, this);
		// //游戏开始
		// core.EventCenter.getInstance().addEventListener(GameConst.GAME_RESTART, this.startResSkill, this);
	}
	public removeEvent() {
		// //游戏停止
		// core.EventCenter.getInstance().removeEventListener(GameConst.GAME_PAUSE, this.gamePause, this);
		// //游戏开始
		// core.EventCenter.getInstance().removeEventListener(GameConst.GAME_RESTART, this.startResSkill, this);

		egret.clearInterval(this.m_pIntervalIndex);
		this.m_pSkillCDLab = null;
		this.m_pShape = null;
	}
	/**用来计算倒计时数字 */
	public m_pCdNum: number = 0;
	/**保存Interval方法的Index */
	public m_pIntervalIndex: number = 0
	/**记录当前技能cd时间 */
	public m_pNowCd: number = 0;
	/**记录进入技能时的初始时间 */
	private m_pStartCd: number = 0;
	/**角度 */
	public m_pAngle: number = 0;
	/**获得一个游戏停止和游戏继续的时间差值 */
	private m_pGetTime: number;
	/**cd控制 */
	public m_pIsSkillStart: boolean = false;
	/**cd文本 */
	public m_pSkillCDLab: eui.BitmapLabel;
	/**一层遮罩 */
	public m_pSkillMask: eui.Image;
	/**遮罩 */
	public m_pShape: egret.Shape = new egret.Shape();
	public m_pIsDecimals: boolean = false;
	/**开始游戏时移动后的技能计时 */
	public gameStartSkillCD(startCD: number) {

		this.m_pIsSkillStart = true;

		this.startSkillCD(startCD);
	}
	/**开始游戏显示的技能cd */
	public gameStartShowCD(startCD: number) {
		// trace("开始游戏时显示cd");
		let shape = this.m_pShape
		let bitmapLab = this.m_pSkillCDLab;
		let skillMask = this.m_pSkillMask;
		this.m_pIsSkillStart = true;
		let cd = startCD;
		if (cd > 9) {
			bitmapLab.x = 77;
		}
		else {
			bitmapLab.x = 77 + bitmapLab.width / 4;
		}
		bitmapLab.text = "" + cd + "";
		bitmapLab.visible = true;
		skillMask.visible = true;
		this.drawRoundness(0.01);
	}
	/**技能cd入口
	 * @cd技能冷却时间
	 */
	public startSkillCD(cd: number) {
		let bitmapLab = this.m_pSkillCDLab;
		let shape = this.m_pShape;
		let skillMask = this.m_pSkillMask;
		this.m_pCdNum = ((cd - Math.floor(cd))) * 10;

		if (this.m_pCdNum > 0) {
			this.m_pIsDecimals = true;
		}
		// egret.log("用来计算倒计时数字" + this.m_pCdNum);
		if (cd > 9) {
			bitmapLab.x = 77;
		}
		else {
			bitmapLab.x = 77 + bitmapLab.width / 4;
		}
		bitmapLab.text = "" + Math.ceil(cd) + "";
		this.m_pNowCd = cd;
		this.m_pStartCd = cd;
		bitmapLab.visible = true;
		skillMask.visible = true;
		this.startDraw(cd);

		this.m_pIntervalIndex = egret.setInterval(this.startDraw, this, 100, cd);
		// egret.log('开启cd计时器'+this.m_pIntervalIndex);
		// EventCenter.instance.addMsg(MapEvent.FRAME_UPDATE, this.startDraw2, this);

		shape.visible = true;
	}

	/**技能cd倒计时 */
	private startCDNum() {
		let bitmapLab = this.m_pSkillCDLab;
		if (bitmapLab != null) {
			// let cdNum = parseInt(bitmapLab.text);

			if (this.m_pIsDecimals == true) {
				this.m_pNowCd = Math.floor(this.m_pNowCd);
				this.m_pIsDecimals = false;
			} else {
				this.m_pNowCd -= 1;
			}
			// egret.log("实际秒数" + this.m_pNowCd);
			let textNum = Math.ceil(this.m_pNowCd);
			if (textNum <= 0) {
				textNum = 1;
			}
			bitmapLab.text = "" + textNum + "";
			// egret.log("显示的数字" + textNum);
			if (this.m_pNowCd > 9) {
				bitmapLab.x = 77;
			}
			else {
				bitmapLab.x = 77 + bitmapLab.width / 4;
			}
			// if (this.m_pNowCd <= 0) {
			// 	bitmapLab.visible = false;
			// }
		}
	}

	// private startDraw2(e: egret.Event) {
	// 	egret.log(e.data);
	// 	if (this.m_pNowCd > 0) {
	// 		(this.m_pNowCd) -= e.data ;
	// 		if (this.m_pNowCd >= 9000) {
	// 			this.m_pSkillCDLab.x = 77;
	// 		}
	// 		else {
	// 			this.m_pSkillCDLab.x = 77 + this.m_pSkillCDLab.width / 4;
	// 		}
	// 		this.m_pSkillCDLab.text = "" + (Math.ceil(this.m_pNowCd*0.001)) + "";
	// 	} else if (this.m_pNowCd <= 0) {
	// 		EventCenter.instance.addMsg(MapEvent.FRAME_UPDATE, this.startDraw2, this);
	// 	}
	// }

	/**每帧执行的技能cd算法 
	 * cd 传入的技能冷却时间
	*/
	private startDraw(cd: number): void {
		let bitmapLab = this.m_pSkillCDLab;
		let shape = this.m_pShape;
		let skillMask = this.m_pSkillMask;
		this.m_pCdNum += 1
		// egret.log("100毫秒运算计算冷却时间"+this.m_pCdNum);

		if (this.m_pCdNum >= 10) {
			this.m_pCdNum = 0;
			this.startCDNum();
		}
		this.m_pAngle += 36 / cd;

		this.drawRoundness(this.m_pAngle);
		if (this.m_pAngle >= 360) {
			this.m_pAngle = 0;
			if (bitmapLab) {
				// egret.log("结束时间"+egret.getTimer());
				// egret.log("正常关闭计时器"+this.m_pIntervalIndex);
				egret.clearInterval(this.m_pIntervalIndex);
				bitmapLab.visible = false;
				skillMask.visible = false;
				this.m_pCdNum = 0;
				// this.m_pIsSkillHintVisible = false;
				shape.visible = false;
				this.m_pIsSkillStart = false;
				// EventCenter.instance.sendMsg(EventType.SKILL_CD_END);
			}
		}

	}
	/**画圆
	 * @angle 角度
	 * 
	 */
	public drawRoundness(angle: number) {
		let shape = this.m_pShape
		shape.graphics.clear();
		shape.graphics.beginFill(0x0f9b9a);
		shape.graphics.drawArc(0, 0, 70, (angle % 360) * Math.PI / 180, 360 * Math.PI / 180);
		shape.graphics.lineTo(0, 0);
		shape.graphics.endFill();
	}
	/**游戏停止获取该时间戳 */
	private gamePause() {
		this.m_pGetTime = egret.getTimer();
		// trace("停止时的时间戳" + this.m_pGetTime);
	}

	private startResSkill() {
		// if (RoomModel.instance().isNetMode && this.m_pIsSkillStart) {
		this.m_pGetTime = egret.getTimer() - this.m_pGetTime;

		let secondTime = this.m_pGetTime * 0.001;
		this.removCD();
		let nowCdTime = this.m_pNowCd - secondTime;
		if (nowCdTime > 0.5) {
			let cdTime = this.m_pStartCd;

			this.m_pIsSkillStart = true;
			// let cdTimePercentage: number = ((cdTime - nowCdTime) * 10) * (36 / cdTime);
			let cdTimePercentage: number = 360 - ((nowCdTime / cdTime) * 360);
			this.m_pAngle = cdTimePercentage;

			this.startSkillCD(cdTime);
			this.m_pCdNum = (nowCdTime - Math.floor(nowCdTime)) * 10;
			this.m_pNowCd = nowCdTime;
			if (nowCdTime > 0) {
				this.m_pIsDecimals = true;
			}
			if (this.m_pNowCd > 9) {
				this.m_pSkillCDLab.x = 77;
			}
			else {
				this.m_pSkillCDLab.x = 77 + this.m_pSkillCDLab.width / 4;
			}
			this.m_pSkillCDLab.text = "" + Math.ceil(nowCdTime) + "";
		}
		// }
	}

	public removCD() {
		this.m_pAngle = 0;
		this.m_pIsSkillStart = false;
		this.m_pSkillCDLab.visible = false;
		this.m_pShape.visible = false;
		this.m_pIsDecimals = false;
		this.m_pSkillMask.visible = false
		this.drawRoundness(this.m_pAngle);
		egret.clearInterval(this.m_pIntervalIndex);

	}
	private setcd(num: number, nus: number) {

	}
}
