var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**角色方向 */
var CharacterDirection;
(function (CharacterDirection) {
    CharacterDirection[CharacterDirection["Right"] = 1] = "Right";
    CharacterDirection[CharacterDirection["RightDown"] = 2] = "RightDown";
    CharacterDirection[CharacterDirection["Down"] = 3] = "Down";
    CharacterDirection[CharacterDirection["LeftDown"] = 4] = "LeftDown";
    CharacterDirection[CharacterDirection["Left"] = 5] = "Left";
    CharacterDirection[CharacterDirection["LeftUp"] = 6] = "LeftUp";
    CharacterDirection[CharacterDirection["Up"] = 7] = "Up";
    CharacterDirection[CharacterDirection["RightUp"] = 8] = "RightUp";
})(CharacterDirection || (CharacterDirection = {}));
/**角色状态 */
var CharacterState;
(function (CharacterState) {
    CharacterState[CharacterState["Stand"] = 1] = "Stand";
    CharacterState[CharacterState["Walk"] = 2] = "Walk";
    CharacterState[CharacterState["Run"] = 3] = "Run";
    CharacterState[CharacterState["Dead"] = 4] = "Dead";
})(CharacterState || (CharacterState = {}));
var DBCharacterFunc = (function () {
    function DBCharacterFunc() {
    }
    /**根据状态获取动画名 */
    DBCharacterFunc.getAnimationNameByState = function (state) {
        var animationName = ["stand", "run"];
        var name = animationName[0];
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
    };
    /**根据方向获取骨架名 */
    DBCharacterFunc.getSlotNameByDirection = function (direction) {
        var slotArmatureName = ["RIGHT", "RIGHTDOWN", "DOWN", "UP", "RIGHTUP"];
        var name = slotArmatureName[0];
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
    };
    return DBCharacterFunc;
}());
__reflect(DBCharacterFunc.prototype, "DBCharacterFunc");
var DBCharacterConst = (function () {
    function DBCharacterConst() {
    }
    return DBCharacterConst;
}());
__reflect(DBCharacterConst.prototype, "DBCharacterConst");
