
/**龙骨显示对象 */
class DBObject extends egret.DisplayObjectContainer {

	/**显示的骨架 */
	protected m_armatureDisplay: dragonBones.EgretArmatureDisplay;


	public static create(armatureName: string) {
		let object = new DBObject(armatureName);
		return object;
	}

	public constructor(armatureName: string) {
		super();

		this.initArmature(armatureName);
	}


	protected initArmature(armatureName: string) {
		this.m_armatureDisplay = DBCharacterMgr.getIns().buildArmatureDisplay(armatureName);
		this.addChild(this.m_armatureDisplay);
	}

	/**隐藏所有骨骼 */
	protected hideAllChildBone() {
		let armatureDisplay: dragonBones.EgretArmatureDisplay = this.m_armatureDisplay;
		let boneNum = armatureDisplay.armature.getBones().length;
		let bones = armatureDisplay.armature.getBones();
		for (let i: number = 0; i < boneNum; i++) {
			let bone = bones[i];
			bone.visible = false;
		}
	}

	/**隐藏所有插槽 */
	protected hideAllSlot() {
		let slots = this.m_armatureDisplay.armature.getSlots();
		let slotNum = slots.length;
		for (let i: number = 0; i < slotNum; i++) {
			let slot = slots[i];
			slot.childArmature.animation.stop();
			slot.display.visible = false;
		}
	}

	/**播放动画 */
	public playAnimation(animationName: string, playTime: number = 0) {
		this.m_armatureDisplay.animation.play(animationName, playTime);
	}

	/**显示骨骼
	 * boneName 骨骼名
	 */
	public showBone(boneName: string) {
		this.m_armatureDisplay.armature.getBone(boneName).visible = true;
	}

	/**显示插槽
	 * slotName 插槽名
	 */
	public showSlot(slotName: string) {
		this.m_armatureDisplay.armature.getSlot(slotName).display.visible = true;
	}

	/**设置插槽显示对象
	 * slotName 插槽名
	 * displayObject 显示对象
	 */
	public setSlotDisplay(slotName: string, displayObject: egret.DisplayObject) {
		let slot = this.m_armatureDisplay.armature.getSlot(slotName);
		slot.setDisplay(displayObject);
	}

}