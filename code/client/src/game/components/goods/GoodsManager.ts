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
            box = new BattleBoxGoods();
        }
        if (data) {
            box.setData(data);
        }
        this.boxs.add(`${box.data.col}_${box.data.row}`, box);
        this.goods.add(`${box.data.col}_${box.data.row}`, box);
        return box;
    }

    public removeBox(box: BattleBoxGoods): void {
        if (box) {
            if (box.parent) {
                box.parent.removeChild(box);
                this.boxs.remove(`${box.data.col}_${box.data.row}`);
                this.goods.remove(`${box.data.col}_${box.data.row}`);
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