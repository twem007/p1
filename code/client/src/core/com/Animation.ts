module core {
	/**
	 *
	 * @author yuxuefeng
	 *
	 */
	export abstract class Animation extends core.Component {
		private loop: core.FrameEventCenter;

		public constructor() {
			super();
			this.touchEnabled = false;
			this.touchChildren = false;
			this.loop = core.FrameEventCenter.getInstance();
		}

		public play(): void {
			this.loop.addFrameEventListener(this.onRenderLoop, this);
		}

		public stop(): void {
			this.loop.removeFrameEventListener(this.onRenderLoop, this);
		}

		public onRenderLoop(offset: number): void {
			if (this.parent == null) {
				this.stop();
			}
		}

		public abstract release(): void;
	}
}
