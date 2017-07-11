var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MapEvent = (function (_super) {
    __extends(MapEvent, _super);
    function MapEvent(type, data, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable, data) || this;
    }
    return MapEvent;
}(egret.Event));
/** 玩家点击移动方向事件*/
MapEvent.TOUCHBG_MSG = "MapEvent_TOUCHBG_MSG";
/**帧率刷新*/
MapEvent.FRAME_UPDATE = "MapEvent_FRAME_UPDATE";
/**地图更新*/
MapEvent.MAP_UPDATE = "MapEvent_UPDATE";
/**地图销毁*/
MapEvent.DESTROY = "MapEvent_DESTROY";
/** 吃道具消息 */
MapEvent.GET_GOODS = "MapEvent_GET_GOODS";
/**击杀消息 */
MapEvent.KILL_ROLE = "MapEvent_KILL_ROLE";
/**加载地图资源完毕 */
MapEvent.CREATE_MAP_RES_COMPLETE = "MapEvent_CREATE_MAP_RES_COMPLETE";
/**点击技能 */
MapEvent.ACROSS_WALL = "MapEvent_ACROSS_WALL";
/**修改EXP后消息 */
MapEvent.CHANGE_EXP = "MapEvent_CHANGE_EXP";
/**处理吃爆发道具后的消息 */
MapEvent.GET_POWER = "MapEvent_GET_POWER";
/**键盘*/
MapEvent.KEY_BOARD = "MapEvent_KEY_BOARD";
/**键盘Up */
MapEvent.KEY_BOARD_UP = "MapEvent_KEY_BOARD_UP";
/**限时模式---玩家改变积分和氮气事件*/
MapEvent.NET_PLAYER_CHANGE_INFO = "MapEvent_NET_PLAYER_CHANGE_INFO";
/**道具刷新 */
MapEvent.PROP_UPDATE = "MapEvent_PROP_UPDATE";
/**玩家被击杀后清空数据消息 */
MapEvent.ROLE_DEAD_DLE_MSG = "MapEvent_ROLE_DEAD_DLE_MSG";
/**复仇标识事件 */
MapEvent.REVENGE_FLAG = "MapEvent_REVENGE_FLAG";
/**氮气等级改变 */
MapEvent.NITROGEN_LEVEL_CHANGE = "MapEvent_NITROGEN_LEVEL_CHANGE";
/**角色复活 */
MapEvent.ROLE_REBIRTH = "MapEvent_ROLE_REBIRTH";
/**舞台改变消息 */
MapEvent.STAGE_CHANGE = "MapEvent_STAGE_CHANGE";
/**更新主角氮气条 */
MapEvent.SYNCH_PLAYER_NITROGEN = "MapEvent_SYNCH_PLAYER_NITROGEN";
/**更新主角复活时间 */
MapEvent.SYNCH_PLAYER_REBIRTH_TIME = "MapEvent_SYNCH_PLAYER_REBIRTH_TIME";
/**地图炸弹爆炸 */
MapEvent.SYNCH_DETONATE_BOMB = "SYNCH_DETONATE_BOMB";
/**追踪目标 */
MapEvent.TRACE_TARGET = "TRACE_TARGET";
/**进入新地图*/
MapEvent.ENTER_MAP = "ENTER_MAP";
/**地图内对象创建完毕*/
MapEvent.MAP_OBJECT_CREATED = "ENTER_OBJECT_CREATED";
__reflect(MapEvent.prototype, "MapEvent");
//# sourceMappingURL=MapEvent.js.map