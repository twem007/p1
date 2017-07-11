var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GoodsManager = (function () {
    function GoodsManager() {
        this.goods = new Dictionary();
        this.boxs = new Dictionary();
    }
    GoodsManager.prototype.creatBox = function (data) {
        var box = core.CachePool.getObj(egret.getQualifiedClassName(BattleBoxGoods));
        if (!box) {
            box = new BattleBoxGoods();
        }
        if (data) {
            box.setData(data);
        }
        this.boxs.add(box.data.col + "_" + box.data.row, box);
        this.goods.add(box.data.col + "_" + box.data.row, box);
        return box;
    };
    GoodsManager.prototype.removeBox = function (box) {
        if (box) {
            if (box.parent) {
                box.parent.removeChild(box);
                this.boxs.remove(box.data.col + "_" + box.data.row);
                this.goods.remove(box.data.col + "_" + box.data.row);
                box.release();
            }
        }
    };
    GoodsManager.instance = function () {
        if (!GoodsManager.s_instance) {
            GoodsManager.s_instance = new GoodsManager();
        }
        return GoodsManager.s_instance;
    };
    return GoodsManager;
}());
__reflect(GoodsManager.prototype, "GoodsManager");
//# sourceMappingURL=GoodsManager.js.map