
/**角色方向 */
enum CharacterDirection {
	Right = 1,
	RightDown = 2,
	Down = 3,
	LeftDown = 4,
	Left = 5,
	LeftUp = 6,
	Up = 7,
	RightUp = 8
}

/**角色状态 */
enum CharacterState {
	Stand = 1,
	Walk = 2,
	Run = 3,
	Dead = 4
}


class DBCharacterFunc {

	/**根据状态获取动画名 */
	public static getAnimationNameByState(state: CharacterState) {
		let animationName = ["stand", "run"];
		let name = animationName[0];
		switch (state) {
			case CharacterState.Stand:
				name = animationName[0];
				break;
			case CharacterState.Walk:
				name = animationName[0];
				break;
			case CharacterState.Run:
				name = animationName[1];
				break;
			case CharacterState.Dead:
				name = animationName[0];
				break;
		}
		return name;
	}

	/**根据方向获取骨架名 */
	public static getSlotNameByDirection(direction: CharacterDirection) {
		let slotArmatureName = ["RIGHT", "RIGHTDOWN", "DOWN", "UP", "RIGHTUP"];
		let name = slotArmatureName[0];
		switch (direction) {
			case CharacterDirection.Right:
				name = slotArmatureName[0];
				break;
			case CharacterDirection.RightDown:
				name = slotArmatureName[1];
				break;
			case CharacterDirection.Down:
				name = slotArmatureName[2];
				break;
			case CharacterDirection.LeftDown:
				name = slotArmatureName[1];
				break;
			case CharacterDirection.Left:
				name = slotArmatureName[0];
				break;
			case CharacterDirection.LeftUp:
				name = slotArmatureName[4];
				break;
			case CharacterDirection.Up:
				name = slotArmatureName[3];
				break;
			case CharacterDirection.RightUp:
				name = slotArmatureName[4];
				break;
		}
		return name;
	}
}

class DBCharacterConst {

}