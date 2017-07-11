class RoleManager {

    private static s_instance: RoleManager;

    public roles: Dictionary<Role>;

    public player:Role;
k
    constructor() {
        this.roles = new Dictionary<Role>();
    }

    public create(data: RoleData): Role {
        let role: Role = core.CachePool.getObj(egret.getQualifiedClassName(Role));
        if (!role) {
            role = new Role(data);
        }
     
        this.roles.add(data.id, role);
        return role;
    }

    public remove(role: Role): void {
        if (role) {
            if (role.parent) {
                role.parent.removeChild(role);
                this.roles.remove(role.data.id);
                role.release();
            }
        }
    }

    public static instance(): RoleManager {
        if (!RoleManager.s_instance) {
            RoleManager.s_instance = new RoleManager();
        }
        return RoleManager.s_instance;
    }
}