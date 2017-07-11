var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * UI事件
 */
var EventType = (function () {
    function EventType() {
    }
    return EventType;
}());
/**服务器连接成功事件 */
EventType.CONNECTED_LOGIN = "CONNECTED_LOGIN";
/**更新排行榜列表事件 用来刷新item类的事件 */
EventType.UPDATE_RANK = "UPDATE_RANK";
/**
 * 重连成功后重置UI事件
 */
EventType.RESET_GAMEUI = 'RESET_GAMEUI';
/**更换头像消息 */
EventType.CHANGE_PLAYERICON = "CHANGE_PLAYERICON";
/**更换昵称消息 */
EventType.CHANGE_PLAYERNICKNAME = "CHANGE_PLAYERNICKNAME";
/**刷新头像列表数据消息 */
EventType.REFRESH_FACEITEM = "REFRESH_FACEITEM";
/**初始刷新MainFaceItem */
EventType.INITMAINFACEITEM = "INITMAINFACEITEM";
/**重连之后还是断网事件 */
EventType.GAME_DISCONNECT_LINK = "GAME_DISCONNECT_LINK";
/**改变穿越按钮位置事件 */
EventType.SET_THROUGH_POINT = "SET_THROUGH_POINT";
/**改变速度按钮位置事件 */
EventType.SET_SPEED_POINT = "SET_SPEED_POINT";
/**改变穿越按钮缩放 */
EventType.SET_THROUGH_SCALE = "SET_THROUGH_SCLACE";
/**改变速度按钮缩放 */
EventType.SET_SPEED_SCALE = "SET_SPEED_SCLACE";
/**改变技能按钮透明度 */
EventType.SET_SKILLBTN_ALPHA = "SET_BTN_ALPHA";
/**主角技能cd结束修改UI事件 */
EventType.SKILL_CD_END = "SKILL_CD_END";
/**选择邮件消息 */
EventType.SELECT_MAIL_MSG = "SELECT_MAIL_MSG";
/**答完问卷信息 */
EventType.QUESTION_COMPLE = "QUESTION_COMPLE";
/**加载完地图资源后删除掉加载界面进入到战斗界面时 */
EventType.COMBAT_LOADING_COMPLE = "COMBAT_LOADING_COMPLE";
/**成功删除邮件 */
EventType.DELED_MAIL_COMPLE = "DELED_MAIL_COMPLE";
__reflect(EventType.prototype, "EventType");
//# sourceMappingURL=EventType.js.map