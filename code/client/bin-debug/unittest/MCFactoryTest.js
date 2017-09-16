var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MCFactoryTest = (function () {
    function MCFactoryTest() {
        this.m_loadings = [];
        core.TimerManager.instance.addTick(10000, 0, this.onCreateMC, this);
    }
    MCFactoryTest.prototype.onCreateMC = function (data) {
        for (var i = 0, iLen = 100; i < iLen; i++) {
            var loading = core.MCFactory.instance.getMovieClip('loading', 'loading', true);
            loading.x = core.LayerCenter.stageWidth * Math.random();
            loading.y = core.LayerCenter.stageHeight * Math.random();
            loading.play(-1);
            core.LayerCenter.getInstance().stage.addChild(loading);
            this.m_loadings.push(loading);
        }
        core.TimerManager.instance.addTick(5000, 1, this.onRemoveMC, this);
    };
    MCFactoryTest.prototype.onRemoveMC = function (data) {
        for (var i = 0, iLen = this.m_loadings.length; i < iLen; i++) {
            var loading = this.m_loadings[i];
            if (loading) {
                core.MCFactory.instance.revertMovieClip(loading);
            }
        }
        this.m_loadings.length = 0;
    };
    return MCFactoryTest;
}());
__reflect(MCFactoryTest.prototype, "MCFactoryTest");
//# sourceMappingURL=MCFactoryTest.js.map