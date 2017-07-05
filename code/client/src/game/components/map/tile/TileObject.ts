/**
 * 地图分块瓦片对象实现
 *
 */
class TileObject extends egret.Bitmap {
	public layerType: number;

	public col: number;
	public row: number;

	public constructor(texture?: egret.Texture) {
		super(texture);
		this.touchEnabled = false;
	}

}

