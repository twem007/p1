class KeyBoardManager {
	private static s_instance: KeyBoardManager;
	public static get getInstance(): KeyBoardManager {
		if (!KeyBoardManager.s_instance) {
			KeyBoardManager.s_instance = new KeyBoardManager();
		}
		return KeyBoardManager.s_instance;
	}

	public addKeyBoardMsg(): void {
		core.EventCenter.getInstance().addEventListener(core.EventID.KEYBOARD_DOWN, this.changeMsg, this);
	}

	public removeKeyBoardMsg(): void {
		core.EventCenter.getInstance().removeEventListener(core.EventID.KEYBOARD_DOWN, this.changeMsg, this);
	}


	private changeMsg(evt: core.EventData) {
		switch (evt.messageData.keyCode) {
			case Keyboard.LEFT:
				core.InputManager.getInstance().sendKey(InputType.LEFT);
				break;
			case Keyboard.RIGHT:
				core.InputManager.getInstance().sendKey(InputType.RIGHT);
				break;
			case Keyboard.UP:
				core.InputManager.getInstance().sendKey(InputType.UP);
				break;
			case Keyboard.DOWN:
				core.InputManager.getInstance().sendKey(InputType.DOWN);
				break;
			case Keyboard.K:
				core.InputManager.getInstance().sendKey(InputType.SKILL_1);
				break;
			case Keyboard.U:
				core.InputManager.getInstance().sendKey(InputType.SKILL_2);
				break;
			case Keyboard.I:
				core.InputManager.getInstance().sendKey(InputType.SKILL_3);
				break;
			case Keyboard.O:
				core.InputManager.getInstance().sendKey(InputType.SKILL_4);
				break;
		}
	}
}