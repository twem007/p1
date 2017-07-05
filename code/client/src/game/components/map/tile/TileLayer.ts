/**
	 * 地图分块层实现
	 */
class TileLayer extends egret.DisplayObjectContainer {
	private _tileWidth: number = 0;
	private _tileHeight: number = 0;
	private _tileCol: number = 0;
	private _tileRow: number = 0;
	//显示的瓦片
	private _tileList: Object;
	private _mapId: number;
	private config: MapCfgConfig;
	//地图瓦片缩放
	private _tileScale: number;
	//背景1
	private _bg1: egret.Bitmap;
	//背景2
	private _bg2: egret.Bitmap;

	public constructor() {
		super();
		this.touchEnabled = false;
		this.touchChildren = false;
	}

	public init(mapId: number, tileCol: number, tileRow: number, tileWidth: number, tileHeight: number) {
		let configs: Dictionary<MapCfgConfig> = Config.getConfig(MapCfgConfig);
		this.config = configs.get(mapId);
		this._mapId = mapId;
		this._tileWidth = tileWidth;
		this._tileHeight = tileHeight;
		this._tileCol = tileCol;
		this._tileRow = tileRow;
		//因使用cacheAsBitmap会导致地图撕裂，随意要比原来的缩放大
		this._tileScale = this._tileWidth / (this._tileWidth - 1);
		if (!this._tileList) {
			this._tileList = {};
		}
		TileCover.topLayerList = {};
		TileCover.roleLayerList = {};
	}

	public create(layerType: MapSetting) {
		if (layerType == MapSetting.BG_LAYER) {
			this.createBg();
		}
		else if (layerType == MapSetting.DECORATION_LAYER) {
			var layerConfig: Object = MapCellData.getMapLayerData(MapSetting.DECORATION_LAYER)
			this.createLayer(this.getTileData(layerConfig['data']), layerConfig['properties']['type']);
		}
	}

	private createBg() {
		if (!this._bg1) {
			this._bg1 = new egret.Bitmap();
		}
		this._bg1.bitmapData = RES.getRes(this.config['bgImg'] + '_1_jpg');
		this.addChild(this._bg1);
		if (!this._bg2) {
			this._bg2 = new egret.Bitmap();
			this._bg2.x = this._tileWidth * this._tileCol * 0.5;
		}
		this._bg2.bitmapData = RES.getRes(this.config['bgImg'] + '_2_jpg');
		this.addChild(this._bg2);
	}

	private createLayer(tileArr: Array<any>, layerType: string) {
		var num: number;
		for (var i: number = 0; i < this._tileRow; i++) {
			for (var j: number = 0; j < this._tileCol; j++) {
				num = tileArr[i][j];
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
		var tile: TileObject = this._tileList[layerType + '_' + col + "_" + row];
		if (!tile) {
			tile = new TileObject();
			tile.x = col * this._tileWidth;
			tile.y = row * this._tileHeight;
			tile.col = col;
			tile.row = row;
			this._tileList[layerType + '_' + col + "_" + row] = tile;
		}
		tile.texture = texture;
		tile.layerType = parseInt(layerType);
		tile.scaleX = tile.scaleY = this._tileScale;

		if (!tile.parent) {
			if (tile.layerType == MapSetting.DECORATION_LAYER) {
				TileCover.add(tile, col, row, imgNum);
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
		return this.config['img'] + "_" + name;
	}

	/**
	 * 获取瓦片数据，转为二位数组
	 * @arr 瓦片配置数据
	 */
	private getTileData(arr: Array<any>): Array<any> {
		var tileArr: Array<any> = [];
		var tileRowArr: Array<any> = [];
		var tileArrLen: number = arr.length;
		for (var i: number = 0; i < tileArrLen; i++) {
			tileRowArr.push(arr[i]);
			if ((i + 1) % this._tileCol === 0) {
				tileArr.push(tileRowArr);
				tileRowArr = [];
			}
		}
		return tileArr;
	}

	public getTile(col: number, row: number) {
		if (this._tileList[MapSetting.DECORATION_LAYER + '_' + col + "_" + row]) {
			return this._tileList[MapSetting.DECORATION_LAYER + '_' + col + "_" + row];
		}
		return;
	}

	public get mapId(): number {
		return this._mapId;
	}

	private destroyAllTile() {
		var tile: egret.Bitmap;
		for (var key in this._tileList) {
			tile = this._tileList[key];
			if (tile.parent) {
				tile.parent.removeChild(tile);
			}
			delete this._tileList[key];
		}
	}

	public destroy() {
		this.destroyAllTile();
		this._tileList = null;
	}
}
