/**
 * 地图分块层实现
 */
class TileLayer extends core.Layer {
	private m_data: MapData;
	//显示的瓦片
	private m_tileList: Object;
	//地图瓦片缩放
	private m_tileScale: number;
	//背景1
	private m_bg1: egret.Bitmap;
	//背景2
	private m_bg2: egret.Bitmap;

	public constructor() {
		super();
		this.touchEnabled = false;
		this.touchChildren = false;
	}

	public init(data: MapData) {
		this.m_data = data;
		//因使用cacheAsBitmap会导致地图撕裂，随意要比原来的缩放大
		this.m_tileScale = this.m_data.tileWidth / (this.m_data.tileWidth - 1);
		if (!this.m_tileList) {
			this.m_tileList = {};
		}
		TileCover.topLayerList = {};
		TileCover.roleLayerList = {};
	}

	public create(layerType: MapSetting) {
		if (layerType == MapSetting.BG_LAYER) {
			this.createBg();
		} else if (layerType == MapSetting.DECORATION_LAYER) {
			let layerData: MapLayerData = this.m_data.getLayerData(MapLayerEnum.DECORATION);
			if (layerData) {
				this.createLayer(Utils.arrToArr2(layerData.data, this.m_data.cols), layerData.properties.type);
			}
		}
	}

	private createBg() {
		if (!this.m_bg1) {
			this.m_bg1 = new egret.Bitmap();
		}
		this.m_bg1.bitmapData = RES.getRes(`${this.m_data.config.bgRes}_1_jpg`);
		this.addChild(this.m_bg1);
		if (!this.m_bg2) {
			this.m_bg2 = new egret.Bitmap();
			this.m_bg2.x = this.m_data.tileWidth * this.m_data.cols * 0.5;
		}
		this.m_bg2.bitmapData = RES.getRes(`${this.m_data.config.bgRes}_2_jpg`);
		this.addChild(this.m_bg2);
	}

	private createLayer(tileArr: Array<any>, layerType: string) {
		for (let i: number = 0, iLen: number = this.m_data.rows; i < iLen; i++) {
			for (let j: number = 0, jLen: number = this.m_data.cols; j < jLen; j++) {
				let num: number = tileArr[i][j];
				if (num > 0) {
					this.createTile(j, i, num, layerType);
				}
			}
		}
	}

	/**
	 *  创建瓦片
	 * @param col
	 * @param row
	 * @param imgNum
	 * @param layerType 层类型
	 */
	private createTile(col: number, row: number, imgNum: number, layerType: string) {
		var texture: egret.Texture = RES.getRes(this.getTileImgName(imgNum - 1));
		var tile: TileObject = this.m_tileList[layerType + '_' + col + "_" + row];
		if (!tile) {
			tile = new TileObject();
			tile.x = col * this.m_data.tileWidth;
			tile.y = row * this.m_data.tileHeight;
			tile.col = col;
			tile.row = row;
			this.m_tileList[layerType + '_' + col + "_" + row] = tile;
		}
		tile.texture = texture;
		tile.layerType = parseInt(layerType);
		tile.scaleX = tile.scaleY = this.m_tileScale;

		if (!tile.parent) {
			if (tile.layerType == MapSetting.DECORATION_LAYER) {
				let tileset: MapTilesetData = this.m_data.getTileData(MapTileEnum.BG);
				if (tileset) {
					TileCover.add(tile, col, row, tileset.getTileProp(imgNum));
				}
			}
		}
	}

	/**
	 * 获取瓦片资源名
	 * @num 图片名
	 */
	private getTileImgName(num: number): string {
		var name: string = num.toString();
		if (name.length === 1) {
			name = "00" + name;
		}
		else if (name.length === 2) {
			name = "0" + name;
		}
		return `${this.m_data.config.mapRes}_${name}`;
	}

	public getTile(col: number, row: number) {
		if (this.m_tileList[MapSetting.DECORATION_LAYER + '_' + col + "_" + row]) {
			return this.m_tileList[MapSetting.DECORATION_LAYER + '_' + col + "_" + row];
		}
		return;
	}

	private destroyAllTile() {
		var tile: egret.Bitmap;
		for (var key in this.m_tileList) {
			tile = this.m_tileList[key];
			if (tile.parent) {
				tile.parent.removeChild(tile);
			}
			delete this.m_tileList[key];
		}
	}

	public destroy() {
		this.destroyAllTile();
		this.m_tileList = null;
	}
}
