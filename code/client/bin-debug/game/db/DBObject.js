var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**龙骨显示对象 */
var DBObject = (function (_super) {
    __extends(DBObject, _super);
    function DBObject(armatureName) {
        var _this = _super.call(this) || this;
        _this.initArmature(armatureName);
        return _this;
    }
    DBObject.create = function (armatureName) {
        var object = new DBObject(armatureName);
        return object;
    };
    DBObject.prototype.initArmature = function (armatureName) {
        this.m_armatureDisplay = DBCharacterMgr.getIns().buildArmatureDisplay(armatureName);
        this.addChild(this.m_armatureDisplay);
    };
    /**隐藏所有骨骼 */
    DBObject.prototype.hideAllChildBone = function () {
        var armatureDisplay = this.m_armatureDisplay;
        var boneNum = armatureDisplay.armature.getBones().length;
        var bones = armatureDisplay.armature.getBones();
        for (var i = 0; i < boneNum; i++) {
            var bone = bones[i];
            bone.visible = false;
        }
    };
    /**隐藏所有插槽 */
    DBObject.prototype.hideAllSlot = function () {
        var slots = this.m_armatureDisplay.armature.getSlots();
        var slotNum = slots.length;
        for (var i = 0; i < slotNum; i++) {
            var slot = slots[i];
            slot.childArmature.animation.stop();
            slot.display.visible = false;
        }
    };
    /**播放动画 */
    DBObject.prototype.playAnimation = function (animationName, playTime) {
        if (playTime === void 0) { playTime = 0; }
        this.m_armatureDisplay.animation.play(animationName, playTime);
    };
    /**显示骨骼
     * boneName 骨骼名
     */
    DBObject.prototype.showBone = function (boneName) {
        this.m_armatureDisplay.armature.getBone(boneName).visible = true;
    };
    /**显示插槽
     * slotName 插槽名
     */
    DBObject.prototype.showSlot = function (slotName) {
        this.m_armatureDisplay.armature.getSlot(slotName).display.visible = true;
    };
    /**设置插槽显示对象
     * slotName 插槽名
     * displayObject 显示对象
     */
    DBObject.prototype.setSlotDisplay = function (slotName, displayObject) {
        var slot = this.m_armatureDisplay.armature.getSlot(slotName);
        slot.setDisplay(displayObject);
    };
    return DBObject;
}(egret.DisplayObjectContainer));
__reflect(DBObject.prototype, "DBObject");
