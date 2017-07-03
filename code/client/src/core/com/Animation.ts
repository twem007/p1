module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
	export abstract class Animation extends core.Component implements core.IRenderLoop {
		private loop: core.FrameEventCenter;

		public constructor() {
			super();
			this.touchEnabled = false;
			this.touchChildren = false;
			this.loop = core.FrameEventCenter.getInstance();
		}

		public play(): void {
			this.loop.addRenderLoop(this);
		}

		public stop(): void {
			this.loop.removeRenderLoop(this);
		}

		public onRenderLoop(offset: number): void {
			if (this.parent == null) {
				this.stop();
			}
		}

		public abstract release(): void;
	}
}
