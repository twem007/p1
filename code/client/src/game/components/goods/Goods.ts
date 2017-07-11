class Goods extends core.Component {

    protected p_data: GoodsData;

    constructor(data: GoodsData) {
        super();
        this.p_data = data;
    }
    /**
     * 释放资源
     */
    public release(): void {
        this.removeChildren();
        this.p_data = null;
        core.CachePool.addObj(egret.getQualifiedClassName(this), this);
    }
    /**
     * 得到道具数据
     */
    public get data(): GoodsData {
        return this.p_data;
    }
    /**
    * 更新道具数据
    */
    public setData(data: GoodsData): void {
        this.p_data = data;
    }
}