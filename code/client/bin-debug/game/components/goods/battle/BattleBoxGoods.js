var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleBoxGoods = (function (_super) {
    __extends(BattleBoxGoods, _super);
    function BattleBoxGoods(data) {
        return _super.call(this, data) || this;
        // this.setBitmap(data.config.fileName);
    }
    BattleBoxGoods.prototype.getData = function () {
        return this.p_data;
    };
    BattleBoxGoods.prototype.setBitmap = function (imgName) {
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
    };
    return BattleBoxGoods;
}(ImageGoods));
__reflect(BattleBoxGoods.prototype, "BattleBoxGoods");
//# sourceMappingURL=BattleBoxGoods.js.map