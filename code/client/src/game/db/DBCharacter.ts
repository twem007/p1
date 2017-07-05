
/**龙骨角色 */
class DBCharacter extends DBObject {

	/**方向 */
	private m_direction: CharacterDirection;
	/**状态 */
	private m_state: CharacterState;

	public static create(armatureName: string) {
		let character = new DBCharacter(armatureName);
		return character;
	}

	public constructor(armatureName: string) {
		super(armatureName);
	}

	protected initArmature(armatureName: string) {
		super.initArmature(armatureName);
		this.hideAllSlot();
	}


	/**设置方向 */
	public setDirection(direction: CharacterDirection) {
		if (this.m_direction == direction) return;
		this.m_direction = direction;
		this.hideAllSlot();
		let animationName = DBCharacterFunc.getAnimationNameByState(this.m_state);
		let slotName = DBCharacterFunc.getSlotNameByDirection(direction)
		this.showSlot(slotName);
		this.playWithChildArmature(animationName, slotName);
	}

	/**设置状态 */
	public setState(state: CharacterState) {
		if (this.m_state == state) return;
		this.m_state = state;
		let animationName = DBCharacterFunc.getAnimationNameByState(state);
		let slotName = DBCharacterFunc.getSlotNameByDirection(this.m_direction)
		this.playWithChildArmature(animationName, slotName);
	}


	/**播放子骨架动画
	 * animationName 动画名
	 * slotName 插槽名
	 */
	public playWithChildArmature(animationName: string, slotName: string) {
		let armature = this.m_armatureDisplay.armature.getSlot(slotName).childArmature;
		armature.animation.play(animationName, 0);
	}


	public replaceTexture(textureName: string) {
		let slotName = DBCharacterFunc.getSlotNameByDirection(this.m_direction);
		let armature = this.m_armatureDisplay.armature.getSlot(slotName).childArmature;
		armature.replaceTexture(RES.getRes(textureName));
	}

	public setSlot(slotName: string) {
		let armature = this.m_armatureDisplay.armature.getSlot(slotName).childArmature;
		let slot = armature.getSlot("arm6");
		slot.setDisplay(new egret.Bitmap(RES.getRes("SwordsMan_tex_json.zuojian2")));
	}


}