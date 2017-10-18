var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KeyBoardManager = (function () {
    function KeyBoardManager() {
    }
    Object.defineProperty(KeyBoardManager, "getInstance", {
        get: function () {
            if (!KeyBoardManager.s_instance) {
                KeyBoardManager.s_instance = new KeyBoardManager();
            }
            return KeyBoardManager.s_instance;
        },
        enumerable: true,
        configurable: true
    });
    KeyBoardManager.prototype.addKeyBoardMsg = function () {
        core.EventCenter.getInstance().addEventListener(core.EventID.KEYBOARD_DOWN, this.changeMsg, this);
    };
    KeyBoardManager.prototype.removeKeyBoardMsg = function () {
        core.EventCenter.getInstance().removeEventListener(core.EventID.KEYBOARD_DOWN, this.changeMsg, this);
    };
    KeyBoardManager.prototype.changeMsg = function (evt) {
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
    };
    return KeyBoardManager;
}());
__reflect(KeyBoardManager.prototype, "KeyBoardManager");
