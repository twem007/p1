var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleManager = (function () {
    function RoleManager() {
        this.roles = new Dictionary();
    }
    RoleManager.prototype.create = function (data) {
        var role = core.CachePool.getObj(egret.getQualifiedClassName(Role));
        if (!role) {
            role = new Role(data);
        }
        this.roles.add(data.id, role);
        return role;
    };
    RoleManager.prototype.remove = function (role) {
        if (role) {
            if (role.parent) {
                role.parent.removeChild(role);
                this.roles.remove(role.data.id);
                role.release();
            }
        }
    };
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