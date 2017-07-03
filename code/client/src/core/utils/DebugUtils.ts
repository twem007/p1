module core {
	/**
	 *
	 * @author 
	 *
	 */
	export class DebugUtils {

		private static s_dic: Dictionary<number> = new Dictionary<number>();

		/**
		 * 开始时间戳
		 */
		public static begin(tag: string): void {
			DebugUtils.s_dic[tag] = Date.now();
		}
		/**
		 * 结束时间戳
		 */
		public static finish(tag: string): number {
			return Date.now() - DebugUtils.s_dic[tag];
		}
	}
}

function Log(message: any, isLocal: boolean = false): void {
	egret.log(message);
}
