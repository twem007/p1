class RoleData extends BaseData {

    public id: number;

    public config: RoleConfig;

    public battleData: BattleData;

    constructor() {
        super();
        this.battleData = new BattleData();
    }
}