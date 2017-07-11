/** 
 * UI事件
 */
class EventType {

    /**服务器连接成功事件 */
    public static CONNECTED_LOGIN: string = "CONNECTED_LOGIN";
    /**更新排行榜列表事件 用来刷新item类的事件 */
    public static UPDATE_RANK: string = "UPDATE_RANK";
    /**
     * 重连成功后重置UI事件
     */
    public static RESET_GAMEUI: string = 'RESET_GAMEUI';
    /**更换头像消息 */
    public static CHANGE_PLAYERICON: string = "CHANGE_PLAYERICON";
    /**更换昵称消息 */
    public static CHANGE_PLAYERNICKNAME: string = "CHANGE_PLAYERNICKNAME";
    /**刷新头像列表数据消息 */
    public static REFRESH_FACEITEM: string = "REFRESH_FACEITEM";
    /**初始刷新MainFaceItem */
    public static INITMAINFACEITEM: string = "INITMAINFACEITEM";



    /**重连之后还是断网事件 */
    public static GAME_DISCONNECT_LINK: string = "GAME_DISCONNECT_LINK";

    /**改变穿越按钮位置事件 */
    public static SET_THROUGH_POINT:string="SET_THROUGH_POINT";
    /**改变速度按钮位置事件 */
    public static SET_SPEED_POINT:string="SET_SPEED_POINT";
     
    /**改变穿越按钮缩放 */ 
    public static SET_THROUGH_SCALE:string="SET_THROUGH_SCLACE";
    /**改变速度按钮缩放 */
    public static SET_SPEED_SCALE:string="SET_SPEED_SCLACE";
    /**改变技能按钮透明度 */
    public static SET_SKILLBTN_ALPHA:string="SET_BTN_ALPHA";

    /**主角技能cd结束修改UI事件 */
    public static SKILL_CD_END:string="SKILL_CD_END";


    /**选择邮件消息 */
    public static SELECT_MAIL_MSG:string="SELECT_MAIL_MSG";
    /**答完问卷信息 */
    public static QUESTION_COMPLE:string="QUESTION_COMPLE";
    /**加载完地图资源后删除掉加载界面进入到战斗界面时 */
    public static COMBAT_LOADING_COMPLE:string="COMBAT_LOADING_COMPLE";
    /**成功删除邮件 */
    public static DELED_MAIL_COMPLE:string="DELED_MAIL_COMPLE";

}




