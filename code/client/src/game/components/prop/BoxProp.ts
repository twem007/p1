/**
 * Created by WZW on 2017/5/3.
 * 道具箱
 */
class BoxProp extends BaseProp {
    constructor(data: BattleGoodsData) {
        super(data);
        this.scaleX = this.scaleY = 1.435;
    }

    private _bitmap:egret.Bitmap;

    private _imgName:string;
    /**
     * 播放生效效果
     */
    public showEffect() {
        if (!this.parent) {
            return;
        }
        // super.showEffect();
        this.setBitmap(this.getTileImgName());
    }

    /**
     * 获取瓦片资源名
     * @num 图片名
     */
    private getTileImgName(): string {
        // var name: string = num.toString();
        var tileArr: Array<any> = [];//MapCellData.getMapLayerData(MapSetting.ARTICLE_LAYER)['data'];
        let cellCol = 30;//MapManager.getInstance().map.cellCol;
        var num: number = tileArr[this.data.row * cellCol + this.data.col];
        var name: string = (num - 1).toString();
        if (name.length === 1) {
            name = "00" + name;
        }
        else if (name.length === 2) {
            name = "0" + name;
        }
        var mapId: number = 101;//MapManager.getInstance().mapId;
        return "";//MapManager.getInstance().mapResData[mapId]['img']+ "_" + name;
    }

    private static _cacheName: string;
    public static getCacheName(): string {
        if (!BoxProp._cacheName) {
            BoxProp._cacheName = egret.getQualifiedClassName(this);
        }
        return BoxProp._cacheName;
    }

    /**
		 * 设置贴图
		 * @param imgName 贴图资源名，如果传null就清掉并移除贴图
		 */
    public setBitmap(imgName: string) {
        if (!this._bitmap) {
            this._bitmap = new egret.Bitmap();
        }
        if (!imgName) {
            this._bitmap.texture = null;
            if (this._bitmap.parent) {
                this.removeChild(this._bitmap);
            }
            return;
        }
        if (this._imgName !== imgName) {
            this._bitmap.texture = RES.getRes(imgName);
            this._imgName = imgName;
      
            this._bitmap.anchorOffsetX = this._bitmap.texture.textureWidth >> 1;
            this._bitmap.anchorOffsetY = this._bitmap.texture.textureHeight >> 1;
            if (!this._bitmap.parent) {
                this.addChild(this._bitmap);
            }
        }
    }
}