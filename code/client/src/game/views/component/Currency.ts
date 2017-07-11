/**
 * 显示货币数量的组件
 */
class Currency extends eui.Component {
	public constructor() {
		super();
	}
	/**金币跳转按钮组 */
	public m_pGoldBtnGroup: eui.Group;
	/**金币文本 */
	public m_pGoldLab: eui.BitmapLabel;
	/**钻石跳转按钮组 */
	public m_pDiamondGroup: eui.Group;
	/**钻石文本*/
	public m_pDiamondLab: eui.BitmapLabel;
	/**点卷组 */
	public m_pDotRollGroup: eui.Group;
	/**点卷文本 */
	public m_pDotRollLab: eui.BitmapLabel;
}