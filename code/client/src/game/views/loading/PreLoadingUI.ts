class PreLoadingUI extends core.Component implements core.ILoadingUI {

    public constructor() {
        super();
        this.createView();
    }

    private textField: egret.TextField;

    private createView(): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    }

    public setProgress(data: core.GroupData): void {
        this.textField.text = `Loading...${data.loaded}/${data.total}`;
    }

    public show(): void {
        core.LayerCenter.getInstance().getLayer(LayerEnum.LOADING).addChild(this);
    }

    public hide(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    public release(): void {

    }
}
