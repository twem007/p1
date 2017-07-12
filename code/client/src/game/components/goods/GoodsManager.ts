class GoodsManager {

    private static s_instance: GoodsManager;

    public goods: Dictionary<Goods>;

    public boxs: Dictionary<BattleBoxGoods>;

    constructor() {
        this.goods = new Dictionary<BattleBoxGoods>();
        this.boxs = new Dictionary<BattleBoxGoods>();
    }

    public creatBox(data?: BattleBoxData): BattleBoxGoods {
        let box: BattleBoxGoods = core.CachePool.getObj(egret.getQualifiedClassName(BattleBoxGoods));
        if (!box) {
            box = new BattleBoxGoods(data);
        }
        let boxData = box.getData();
        this.boxs.add(`${boxData.col}_${boxData.row}`, box);
        this.goods.add(`${boxData.col}_${boxData.row}`, box);
        return box;
    }

    public removeBox(box: BattleBoxGoods): void {
        if (box) {
            if (box.parent) {
                box.parent.removeChild(box);
                let boxData = box.getData();
                this.boxs.remove(`${boxData.col}_${boxData.row}`);
                this.goods.remove(`${boxData.col}_${boxData.row}`);
                box.release();
            }
        }
    }

    public static instance(): GoodsManager {
        if (!GoodsManager.s_instance) {
            GoodsManager.s_instance = new GoodsManager();
        }
        return GoodsManager.s_instance;
    }
}