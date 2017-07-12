class BattleBoxGoods extends ImageGoods {
    constructor(data?: BattleBoxData) {
        super(data);
        // this.setBitmap(data.config.fileName);
    }
    private _bitmap: egret.Bitmap;
    public getData():BattleBoxData{
        return <BattleBoxData>this.p_data;
    }

    public setBitmap(imgName: string) {
        if (!imgName) {
            if (this._bitmap) {
                this._bitmap.texture = null;
                if (this._bitmap.parent) {
                    this.removeChild(this._bitmap);
                }
            }
            return;
        }
        if (!this._bitmap) {
            this._bitmap = new egret.Bitmap();
        }

        this._bitmap.texture = RES.getRes(imgName);
        this._bitmap.anchorOffsetX = this._bitmap.texture.textureWidth >> 1;
        this._bitmap.anchorOffsetY = this._bitmap.texture.textureHeight >> 1;
        if (!this._bitmap.parent) {
            this.addChild(this._bitmap);
        }
    }
}