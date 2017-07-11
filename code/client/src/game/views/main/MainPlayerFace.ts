/**
 * 主界面的玩家头像组件
 */
class MainPlayerFace extends eui.Component {
	/**段位图片 */
	public m_pGradingImg: eui.Image;
	/**名字文本 */
	public m_pNameLab: eui.Label;
	/**等级文本 */
	public m_pLvNum: eui.Label;
	/**经验进度条组 */
	public m_pProGroup: eui.Group;
	/**经验的进度条图片 */
	public m_pProImg: eui.Image;
	/**玩家头像的图片 */
	public m_pPlayerFaceImg: eui.Image;

	public constructor() {
		super();
	}
}