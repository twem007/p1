class ResUtilsTest {
    constructor() {
        RES.createGroup('TestGroup', ['commonBoom_json'])
        core.ResUtils.loadGroups(['TestGroup'], null, null, this.onLoadComplete, this);
        core.ResUtils.loadGroups(['TestGroup'], null, null, this.onLoadComplete, this);
    }

    private onLoadComplete(data: core.GroupData): void {
        egret.log(`${data.curGroup}加载完毕`);
    }
}