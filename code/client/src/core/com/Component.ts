module core {
	/**
	 *
	 * @author 
	 *
	 */
	export abstract class Component extends egret.DisplayObjectContainer implements IComponent {
		public constructor() {
			super();
		}

		public removeFromParent(): void {
			if (this.parent) {
				this.parent.removeChild(this);
			}
		}

		public abstract release(): void;
	}
}
