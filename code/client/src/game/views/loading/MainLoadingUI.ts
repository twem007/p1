class MainLoadingUI extends core.EUIComponent implements core.ILoadingUI {
    /**主组 */
    public m_pMainGroup: eui.Group;
    /**要加载资源的数量*/
    public m_pResNum: number = 0;
    /**要加载的资源百分比文本*/
    public m_pLoginLbl: eui.Label;
    /**进度条组 */
    public m_pProgressGroup: eui.Group;
    /**进度条显示 */
    public m_pProgressImg: eui.Image;
    /**进度条遮罩 */
    public m_pProgressMask: eui.Image;
    /**进度条小图标 */
    public m_pProgressStar: eui.Image;
    /**加载文本显示 */
    public m_pStateLbl: eui.Label;
    //资源组完成数
    public m_pResGroupsCompleteCount: number = 0;
    //资源项数
    public m_pResItemCount: number = 0;
    //资源项完成数
    public m_pResItemCompleteCount: number = 0;
    /**logo */
    public m_pLogoImg: eui.Image;

    public constructor() {
        super();
        this.skinName = 'resource/skins/loading/LoadingSkin.exml';
    }
    protected childrenCreated(): void {
        super.childrenCreated();
        this.m_pProgressImg.mask = this.m_pProgressMask;
        this.m_pProgressMask.width = 0;
        this.m_pStateLbl.text = "首次进游戏需加载更多资源，疯狂载入中...";
    }

    public setProgress(progress: core.GroupData): void {
        if (!this.m_pProgressMask) return;
        let percent: number = progress.curGroupLoaded / progress.curGroupTotal;
        this.m_pProgressMask.width = this.m_pProgressGroup.width * percent;
        this.m_pLoginLbl.text = "正在加载游戏" + Math.floor(percent * 100 << 0) + "%"
        this.m_pProgressStar.x = this.m_pProgressMask.width - this.m_pProgressStar.width;
        this.m_pProgressStar.visible = this.m_pProgressStar.x >= 0;
    }

    public show(): void {
        core.LayerCenter.getInstance().getLayer(LayerEnum.LOADING).addChild(this);
    }
    public release() {
	}

    public hide(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
    public updateAdaptive(): void {

    }
}
