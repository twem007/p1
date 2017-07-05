module core {
	/**
	 *
	 * @author 
	 *
	 */
	export class Core {

		public constructor() {
		}

		public static run(stage: egret.Stage): void {
			core.FrameEventCenter.getInstance().init(stage);
			core.LayerCenter.getInstance().init(stage);
			RES.setMaxRetryTimes(3);
		}
	}
}
