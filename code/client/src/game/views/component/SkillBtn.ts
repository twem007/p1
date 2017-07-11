/**
 * 道具技能按钮
 */
class SkillBtn extends eui.Component {
	/**技能图片 */
	public m_pSkillImg: eui.Image;
	/**技能剩余数量 */
	public m_pNumLab: eui.BitmapLabel;
	public constructor() {
		super();
	}
	protected createChildren()
	{
		super.createChildren();
		this.m_pNumLab.visible=false;
	}

}