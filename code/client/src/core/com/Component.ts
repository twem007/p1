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

		public abstract release(): void;
	}
}
