module core {
	/**
	 * 调试工具
	 * 本类功能说明：
	 * 1、统计方法耗时
	 * 2、日志开关
	 */
	export class DebugUtils {

		private static s_dic: Dictionary<number> = new Dictionary<number>();
		/**
		 * 系统事件日志开关
		 */
		public static EVENT_LOG:boolean = true;
		/**
		 * 系统事件日志超时警告时间
		 */
		public static EVENT_LIMIT:number = 5;
		/**
		 * 开始时间戳
		 * @param  {string} tag	计时标签
		 */
		public static begin(tag: string): void {
			DebugUtils.s_dic[tag] = Date.now();
		}
		/**
		 * 结束时间戳
		 * @param  {string} tag	计时标签
		 * @return number	结束时间戳与开始时间戳的时间差
		 */
		public static finish(tag: string): number {
			return Date.now() - DebugUtils.s_dic[tag];
		}
	}
}
