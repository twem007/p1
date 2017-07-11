class RoundEndPlayerMsgItem extends eui.Component {
	public constructor() {
		super();
	}
	/**背景 */
	public m_pBg: eui.Image;
	/**玩家图片 */
	public m_pPlayerIcon: eui.Image;
	/**解救的队友次数 */
	public m_pHelpNum: eui.Label;
	/**俘虏的敌人次数 */
	public m_pCaptureNum: eui.Label;
	/**击杀的玩家次数 */
	public m_pKillNum: eui.Label;
	/**玩家的名字 */
	public m_pPlayerName: eui.Label;
	/**MVP标志 */
	public m_pMVP: eui.Image;
	/**添加好友图标 */
	public m_pAddFriend: eui.Image;
	/**战场ID */
	public m_pBattleID: number;
}