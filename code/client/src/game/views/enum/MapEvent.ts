class MapEvent extends egret.Event {
	constructor(type: string, data?: any, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable, data);
	}

	/** 玩家点击移动方向事件*/
	public static TOUCHBG_MSG: string = "MapEvent_TOUCHBG_MSG";

	/**帧率刷新*/
	public static FRAME_UPDATE: string = "MapEvent_FRAME_UPDATE";

	/**地图更新*/
	public static MAP_UPDATE: string = "MapEvent_UPDATE";

	/**地图销毁*/
	public static DESTROY: string = "MapEvent_DESTROY";

	/** 吃道具消息 */
	public static GET_GOODS = "MapEvent_GET_GOODS";

	/**击杀消息 */
	public static KILL_ROLE = "MapEvent_KILL_ROLE";

	/**加载地图资源完毕 */
	public static CREATE_MAP_RES_COMPLETE = "MapEvent_CREATE_MAP_RES_COMPLETE";

	/**点击技能 */
	public static ACROSS_WALL = "MapEvent_ACROSS_WALL";

	/**修改EXP后消息 */
	public static CHANGE_EXP = "MapEvent_CHANGE_EXP";

	/**处理吃爆发道具后的消息 */
	public static GET_POWER = "MapEvent_GET_POWER";

	/**键盘*/
	public static KEY_BOARD = "MapEvent_KEY_BOARD";
	/**键盘Up */
	public static KEY_BOARD_UP = "MapEvent_KEY_BOARD_UP";

	/**限时模式---玩家改变积分和氮气事件*/
	public static NET_PLAYER_CHANGE_INFO = "MapEvent_NET_PLAYER_CHANGE_INFO";

	/**道具刷新 */
	public static PROP_UPDATE = "MapEvent_PROP_UPDATE";

	/**玩家被击杀后清空数据消息 */
	public static ROLE_DEAD_DLE_MSG = "MapEvent_ROLE_DEAD_DLE_MSG";

	/**复仇标识事件 */
	public static REVENGE_FLAG = "MapEvent_REVENGE_FLAG";

	/**氮气等级改变 */
	public static NITROGEN_LEVEL_CHANGE = "MapEvent_NITROGEN_LEVEL_CHANGE";

	/**角色复活 */
	public static ROLE_REBIRTH = "MapEvent_ROLE_REBIRTH";

	/**舞台改变消息 */
	public static STAGE_CHANGE = "MapEvent_STAGE_CHANGE";


	/**更新主角氮气条 */
	public static SYNCH_PLAYER_NITROGEN = "MapEvent_SYNCH_PLAYER_NITROGEN";

	/**更新主角复活时间 */
	public static SYNCH_PLAYER_REBIRTH_TIME = "MapEvent_SYNCH_PLAYER_REBIRTH_TIME";

	/**地图炸弹爆炸 */
	public static SYNCH_DETONATE_BOMB = "SYNCH_DETONATE_BOMB";

	/**追踪目标 */
	public static TRACE_TARGET = "TRACE_TARGET";

	/**进入新地图*/
	public static ENTER_MAP = "ENTER_MAP";
	/**地图内对象创建完毕*/
	public static MAP_OBJECT_CREATED = "ENTER_OBJECT_CREATED";

}
