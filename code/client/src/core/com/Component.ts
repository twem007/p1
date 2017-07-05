module core {
	/**
	 *
	 * @author 
	 *
	 */
	export abstract class Component extends egret.DisplayObjectContainer {
		public constructor() {
			super();
		}

        /**
		 * addChild 的高效实现，慎用 
		 * @param container
		 * @param child
		 */
		public addElement(container: egret.DisplayObjectContainer, child: egret.DisplayObject): void {
			if (child.$parent != container) {
				if (child.$parent) {
					this.removeElementFromParent(child);
				}
				container.$children.push(child);
				child.$parent = container;
			}
		}

        /**
         * addChildAt 的高效实现，慎用
         * @param container
         * @param child
         * @param index
         */
		public addElementAt(container: egret.DisplayObjectContainer, child: egret.DisplayObject, index: number): void {
			if (child.$parent != container) {
				if (child.$parent) {
					this.removeElementFromParent(child);
				}
				container.$children.splice(index, 0, child);
				child.$parent = container;
			}
		}

        /**
         * removeFromParent 的高效实现，慎用
         * @param child
         */
		public removeElementFromParent(child: egret.DisplayObject): void {
			if (child && child.$parent) {
				var index = child.$parent.$children.indexOf(child);
				child.$parent.$children.splice(index, 1);
				child.$parent = null;
			}
		}

        /**
         * removeChildAt 的高效实现，慎用
         * @param container
         * @param index
         */
		public removeElementAt(container: egret.DisplayObjectContainer, index: number): void {
			var child: egret.DisplayObject = container.$children[index];
			if (child) {
				container.$children.splice(index, 1);
				child.$parent = null;
			}
		}

        /**
         * removeAllChild 的高效实现，慎用
         * @param container
         */
		public removeAllElement(container: egret.DisplayObjectContainer): void {
			while (container.$children.length) {
				this.removeElementAt(container, 0);
			}
		}

		public abstract release(): void;
	}
}
