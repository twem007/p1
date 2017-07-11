var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleControl = (function () {
    function RoleControl() {
    }
    Object.defineProperty(RoleControl.prototype, "role", {
        get: function () {
            return this.p_role;
        },
        enumerable: true,
        configurable: true
    });
    return RoleControl;
}());
__reflect(RoleControl.prototype, "RoleControl");
//# sourceMappingURL=RoleControl.js.map