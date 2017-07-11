class RoleManager {

    private static s_instance: RoleManager;

    public roles: Dictionary<Role>;

    public monsters: Dictionary<Monster>;

    constructor() {
        this.roles = new Dictionary<Role>();
        this.monsters = new Dictionary<Monster>();
    }

    public static instance(): RoleManager {
        if (!RoleManager.s_instance) {
            RoleManager.s_instance = new RoleManager();
        }
        return RoleManager.s_instance;
    }
}