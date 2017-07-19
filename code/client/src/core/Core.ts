module core {
	/**
	 *	框架GIT地址：https://github.com/twem007/p1
	 * @author yuxuefeng
	 *
	 */
	export class Core {

		public constructor() {
		}

		public static run(stage: egret.Stage): void {
			Log(`框架GIT地址：https://github.com/twem007/p1`);
			core.FrameEventCenter.getInstance().init(stage);
			core.LayerCenter.getInstance().init(stage);
			if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
				core.WebUtils.addKeyboardListener();
			}
			RES.setMaxRetryTimes(3);
		}
	}
}
