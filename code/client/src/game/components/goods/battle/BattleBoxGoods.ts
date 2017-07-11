class BattleBoxGoods extends ImageGoods {
    constructor(data?:BattleBoxData) {
        super(data);
    }

     public get data(): BattleBoxData {
        return <BattleBoxData>this.p_data;
    }
}