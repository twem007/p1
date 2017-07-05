var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**龙骨角色 */
var DBCharacter = (function (_super) {
    __extends(DBCharacter, _super);
    function DBCharacter(armatureName) {
        return _super.call(this, armatureName) || this;
    }
    DBCharacter.create = function (armatureName) {
        var character = new DBCharacter(armatureName);
        return character;
    };
    DBCharacter.prototype.initArmature = function (armatureName) {
        _super.prototype.initArmature.call(this, armatureName);
        this.hideAllSlot();
    };
    /**设置方向 */
    DBCharacter.prototype.setDirection = function (direction) {
        if (this.m_direction == direction)
            return;
        this.m_direction = direction;
        this.hideAllSlot();
        var animationName = DBCharacterFunc.getAnimationNameByState(this.m_state);
        var slotName = DBCharacterFunc.getSlotNameByDirection(direction);
        this.showSlot(slotName);
        this.playWithChildArmature(animationName, slotName);
    };
    /**设置状态 */
    DBCharacter.prototype.setState = function (state) {
        if (this.m_state == state)
            return;
        this.m_state = state;
        var animationName = DBCharacterFunc.getAnimationNameByState(state);
        var slotName = DBCharacterFunc.getSlotNameByDirection(this.m_direction);
        this.playWithChildArmature(animationName, slotName);
    };
    /**播放子骨架动画
     * animationName 动画名
     * slotName 插槽名
     */
    DBCharacter.prototype.playWithChildArmature = function (animationName, slotName) {
        var armature = this.m_armatureDisplay.armature.getSlot(slotName).childArmature;
        armature.animation.play(animationName, 0);
    };
    DBCharacter.prototype.replaceTexture = function (textureName) {
        var slotName = DBCharacterFunc.getSlotNameByDirection(this.m_direction);
        var armature = this.m_armatureDisplay.armature.getSlot(slotName).childArmature;
        armature.replaceTexture(RES.getRes(textureName));
    };
    DBCharacter.prototype.setSlot = function (slotName) {
        var armature = this.m_armatureDisplay.armature.getSlot(slotName).childArmature;
        var slot = armature.getSlot("arm6");
        slot.setDisplay(new egret.Bitmap(RES.getRes("SwordsMan_tex_json.zuojian2")));
    };
    return DBCharacter;
}(DBObject));
__reflect(DBCharacter.prototype, "DBCharacter");
