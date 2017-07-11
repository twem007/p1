class CombatPlayerFace extends eui.Component {
	public constructor() {
		super();
	}
	/**主组 */
	public m_pMainGroup: eui.Group;
	/**还没有选手时显示 */
	public m_pQueGroup: eui.Group;
	/**有选手时显示 */
	public m_pFaceIcon: eui.Image;
	/**死亡时显示 */
	public m_pDeadGroup: eui.Group;
	/**对应角色的战场ID */
	public m_pBattleID: number;
}