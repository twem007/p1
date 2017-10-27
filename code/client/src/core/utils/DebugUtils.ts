module core {
	/**
	 *
	 * @author 
	 *
	 */
	export class DebugUtils {

		private static s_dic: Dictionary<number> = new Dictionary<number>();
		/**
		 * 系统事件日志开关
		 */
		public static EVENT_LOG:boolean = true;
		/**
		 * 系统事件日志统计边界
		 */
		public static EVENT_LIMIT:number = 5;
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
