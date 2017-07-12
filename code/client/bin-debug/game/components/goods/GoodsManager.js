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
            box = new BattleBoxGoods(data);
        }
        var boxData = box.getData();
        this.boxs.add(boxData.col + "_" + boxData.row, box);
        this.goods.add(boxData.col + "_" + boxData.row, box);
        return box;
    };
    GoodsManager.prototype.removeBox = function (box) {
        if (box) {
            if (box.parent) {
                box.parent.removeChild(box);
                var boxData = box.getData();
                this.boxs.remove(boxData.col + "_" + boxData.row);
                this.goods.remove(boxData.col + "_" + boxData.row);
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