/**走马灯公告界面 */
 class NoticeAnimView extends core.EUIComponent {
		/**主组 */
		private m_pMainGroup: eui.Group
		/**公告组 */
		private m_pHintGroup: eui.Group;
		/**底图 */
		private m_pHintBgImg: eui.Image;
		/**文本 */
		private m_pHintLab: eui.Label;
		/**定宽的组 */
		private m_pWidthGroup: eui.Group;

		/**要输入的文本内容 */
		// public static m_pText: string;
		/**控制唯一的 */
		public static ISOPEN: boolean = false;
		/**获取信息 */
		public static MSGDATA = [];
		public constructor() {
			super();
			this.skinName = "resource/skins/notice/NoticeHintAnimSkin.exml";
		}
		protected onShow(): void {
			super.onShow();
			this.m_pHintLab.text = null;
			NoticeAnimView.ISOPEN = true;
			this.noticeMsg();
			// if (MapManager.getInstance().isInit == false) {
			// 	this.m_pHintGroup.y = 135;
			// } else {
			// 	this.m_pHintGroup.y =core.LayerCenter.stageHeight - 30;
			// 	// this.m_pHintGroup.y=170;
			// }
		}
		protected addListener() {
			super.addListener();
			core.EventCenter.getInstance().addEventListener(EventType.COMBAT_LOADING_COMPLE, this.changePoint, this);
		}
		public onAdaptive() {
			UIManager.updataPoint(this.m_pHintGroup, 670, 182);
			this.changePoint();
		}
		public release() {
	}
		protected removeListener() {
			super.removeListener();
			core.EventCenter.getInstance().removeEventListener(EventType.COMBAT_LOADING_COMPLE, this.changePoint, this);
		}
		private onClickClose() {

		}
		private changePoint() {
			// if (MapManager.getInstance().isInit == true) {
			// 	this.m_pHintGroup.y = core.LayerCenter.stageHeight - 30;
			// 	// this.m_pHintGroup.y=170;
			// }
		}
		/**公告广播推送 */
		private noticeMsg(speed: number = 0.15) {
			let hintLab: eui.Label = this.m_pHintLab;
			let hintBg: eui.Image = this.m_pHintBgImg;
			let hintGroup: eui.Group = this.m_pWidthGroup;
			let text: string = NoticeAnimView.MSGDATA.shift();
			if (text) {
				let urlText = decodeURIComponent(text);
				Log("走马灯后端发的字符串" + urlText);
				Utils.setRichText(hintLab, urlText);
				hintLab.x = this.m_pWidthGroup.width;
				hintBg.scaleX = 0;
				egret.Tween.removeTweens(hintBg);
				egret.Tween.removeTweens(hintLab);

				egret.Tween.get(hintBg).to({ scaleX: 1 }, 300).wait((hintLab.width + hintGroup.width) / speed).to({ scaleX: 0 }, 300).call(this.noticeMsg, this);
				egret.Tween.get(hintLab).wait(300).to({ x: (hintGroup.x - hintLab.width) }, (hintLab.width + hintGroup.width) / speed);
			} else {
				core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE,ModuleEnum.NOTICEANIM));
				NoticeAnimView.ISOPEN = false;
			}
		}
	}