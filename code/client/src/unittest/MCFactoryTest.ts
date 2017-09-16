class MCFactoryTest {

    private m_loadings: egret.MovieClip[];

    constructor() {
        this.m_loadings = [];
        core.TimerManager.instance.addTick(10000, 0, this.onCreateMC, this);
    }

    private onCreateMC(data: core.TickData): void {
        for (let i: number = 0, iLen: number = 100; i < iLen; i++) {
            let loading: egret.MovieClip = core.MCFactory.instance.getMovieClip('loading', 'loading', true);
            loading.x = core.LayerCenter.stageWidth * Math.random();
            loading.y = core.LayerCenter.stageHeight * Math.random();
            loading.play(-1);
            core.LayerCenter.getInstance().stage.addChild(loading);
            this.m_loadings.push(loading);
        }
        core.TimerManager.instance.addTick(5000, 1, this.onRemoveMC, this);
    }

    private onRemoveMC(data: core.TickData): void {
        for (let i: number = 0, iLen: number = this.m_loadings.length; i < iLen; i++) {
            let loading: egret.MovieClip = this.m_loadings[i];
            if (loading) {
                core.MCFactory.instance.revertMovieClip(loading);
            }
        }
        this.m_loadings.length = 0;
    }
}