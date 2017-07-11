var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleManager = (function () {
    function RoleManager() {
        this.roles = new Dictionary();
        this.monsters = new Dictionary();
    }
    RoleManager.instance = function () {
        if (!RoleManager.s_instance) {
            RoleManager.s_instance = new RoleManager();
        }
        return RoleManager.s_instance;
    };
    return RoleManager;
}());
__reflect(RoleManager.prototype, "RoleManager");
//# sourceMappingURL=RoleManager.js.map