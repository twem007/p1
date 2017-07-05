/**
 * 游戏地图实现类 
 * <p>本地图类为单例模式，基于地图类的实现可以继承本类来完成。</p>
 * 
 */
class Map extends egret.DisplayObjectContainer {
	/** 背景瓦片层 */ 
	private _bgLayerTile: TileLayer; 

	/** 顶层瓦片层 */
	private _topLayer: egret.DisplayObjectContainer;

	/** 效果层  */
	private _effectiveLayer: egret.DisplayObjectContainer;

	/** 地图编号 */
	private _mapId: number = 0;

	/** 道具层 */
	private _propLayer: egret.DisplayObjectContainer;
	/**炸弹层*/
	private _bombLayer: egret.DisplayObjectContainer;

	/** 角色层 */
	private _roleLayer: egret.DisplayObjectContainer;
	/**
	 * 角色名字条层
	 */
	private _roleInfoLayer: egret.DisplayObjectContainer;

	/** 地图路径层数据 */
	private _mapWayArr: Array<any>;

	/** 地图宽度 */
	private _mapWidth: number = 0;

	/** 地图高度 */
	private _mapHeight: number = 0;

	/** 瓦片宽度 */
	private _tileWidth: number = 0;

	/** 瓦片高度 */
	private _tileHeight: number = 0;

	/** 网格行数 */
	private _cellRow: number = 0;

	/** 网格列数 */
	private _cellCol: number = 0;

	/** 网格宽度 */
	private _cellWidth: number = 0;

	/** 网格高度 */
	private _cellHeight: number = 0;
	//camera横向移动宽度
	private _cameraW: number = 0;
	//camera竖向移动宽度
	private _cameraH: number = 0;
	//判断地图更新
	private m_concularUpdate: egret.Point = egret.Point.create(0, 0);
	//是否地图更新
	private m_isUpdateTile: boolean = false;
	//当前视野网格
	public currentViewCell: egret.Rectangle;
	//当前视野区域
	public currentViewArea: egret.Rectangle;

	private tt = false;
	private timerT = 0;
	private ttOffset = 1;

	public constructor() {
		super();
		this.touchEnabled = false;
		this.touchChildren = false;
	}

	public init(mapId: number) {
		this.mapId = mapId;
		if (MapCellData.currentMapId !== mapId) {
			MapCellData.currentMapId = mapId;
			MapCellData.clear();
		}
		let mapConfigs: Dictionary<MapCfgConfig> = Config.getConfig(MapCfgConfig);
		let mapConfig: MapCfgConfig = mapConfigs.get(mapId);
		let configName: string = `${mapConfig.mapData}_json`;
		var config: Object = MapCellData.mapOriginalData = RES.getRes(configName);
		if (!config) {
			// trace(`地图:${configName}配置不存在`);
			return;
		}
		//默认使用一张图
		var tileInfo: Object = config['tilesets'][0];

		this._tileWidth = tileInfo['tilewidth'];
		this._tileHeight = tileInfo['tileheight'];
		this._cellWidth = config['tilewidth'];
		this._cellHeight = config['tileheight'];
		this._cellRow = config['height'];
		this._cellCol = config['width'];
		this._mapWidth = this._cellCol * this._cellWidth;
		this._mapHeight = this._cellRow * this._cellHeight;

		this._mapWayArr = MapCellData.getMapWayData();
		this.initMapLayer();
		//摄象机宽度
		this._cameraW = this._cellWidth;
		this._cameraH = this._cellHeight;
		//把地图空闲位置保存起来
		this.getEmptyCell();
	}

	public create() {
		this.createTileLayer(MapCellData.mapOriginalData['layers']);
	}

	/**
	 * 获取场景可视区域
	 */
	public getViewArea(): egret.Rectangle {
		var x: number = Math.max(-this.x, 0);
		var y: number = Math.max(-this.y, 0);
		var viewW: number = Math.min(this._mapWidth - x, this.stage.stageWidth);
		var viewH: number = Math.min(this._mapHeight - y, this.stage.stageHeight);
		if (this.x > 0) {
			viewW = this.stage.stageWidth - this.x;
		}
		if (this.y > 0) {
			viewH = this.stage.stageHeight - this.y;
		}
		var viewArea: egret.Rectangle = new egret.Rectangle(x, y, viewW, viewH);

		return viewArea;
	}

	/**
	 * 是否在可视区域内
	 * @x 坐标X
	 * @y 坐标y
	 */
	public isInViewArea(x, y): boolean {
		var viewArea: egret.Rectangle = this.currentViewArea ? this.currentViewArea : this.getViewArea();
		return viewArea.contains(x, y);
	}

	/**
	 * 是否在可视区网格内（推荐用isInViewArea，因为少了一层运算）
	 * @col 列
	 * @row 行
	 */
	public isInViewCell(col, row): boolean {
		var viewCell: egret.Rectangle = this.currentViewCell ? this.currentViewCell : this.getViewCell();
		return viewCell.contains(col, row);
	}

	/**
	 * 获取可视网格，屏幕外围加一圈网格
	 */
	public getViewCell(): egret.Rectangle {
		var viewArea: egret.Rectangle = this.getViewArea();
		var rowIndex = Math.floor(viewArea.y / this._tileHeight);
		var colIndex = Math.floor(viewArea.x / this._tileWidth);
		var rowCount = Math.ceil(viewArea.height / this._tileHeight);
		var colCount = Math.ceil(viewArea.width / this._tileWidth);

		//外围加一圈网格
		if (rowIndex > 0) {
			rowIndex--;
			rowCount++;
		}
		if (colIndex > 0) {
			colIndex--;
			colCount++;
		}
		if (rowIndex + rowCount < this._cellRow) {
			rowCount++;
		}
		if (colIndex + colCount < this.cellCol) {
			colCount++;
		}
		return new egret.Rectangle(colIndex, rowIndex, colCount, rowCount);
	}

	private createTileLayer(layersArr: Array<any>) {
		if (this._mapId != this._bgLayerTile.mapId) {
			this._bgLayerTile.init(this._mapId, this._cellCol, this.cellRow, this._tileWidth, this._tileHeight);
			this._bgLayerTile.create(MapSetting.BG_LAYER);
			this._bgLayerTile.create(MapSetting.DECORATION_LAYER);
		}
		TileCover.addAllToLayer(this);
	}

	private initMapLayer() {
		if (!this._bgLayerTile) {
			this._bgLayerTile = new TileLayer();
		}
		if (!this.contains(this._bgLayerTile)) {
			this.addChild(this._bgLayerTile);
		}

		if (!this._effectiveLayer) {
			this._effectiveLayer = new egret.DisplayObjectContainer();
		}
		if (!this.contains(this._effectiveLayer)) {
			this.addChild(this._effectiveLayer);
		}

		if (!this._propLayer) {
			this._propLayer = new egret.DisplayObjectContainer();
		}
		if (!this.contains(this._propLayer)) {
			this.addChild(this._propLayer);
		}

		if (!this._bombLayer) {
			this._bombLayer = new egret.DisplayObjectContainer();
		}
		if (!this.contains(this._bombLayer)) {
			this.addChild(this._bombLayer);
		}

		if (!this._roleLayer) {
			this._roleLayer = new egret.DisplayObjectContainer();
		}
		if (!this.contains(this._roleLayer)) {
			this.addChild(this._roleLayer);
		}
		if (!this._topLayer) {
			this._topLayer = new egret.DisplayObjectContainer();
		}
		if (!this.contains(this._topLayer)) {
			this.addChild(this._topLayer);
		}
		if (!this._roleInfoLayer) {
			this._roleInfoLayer = new egret.DisplayObjectContainer();
		}
		if (!this.contains(this._roleInfoLayer)) {
			this.addChild(this._roleInfoLayer);
		}

	}

	/**
	 * 地图移动
	 *@param moveOffset  地图移动偏移量
	 */
	public moveMap(moveOffset: egret.Point) {
		this.x += moveOffset.x;
		this.y += moveOffset.y;
	}
	/**
	 * 坐标点转网格 
	 * @param px
	 * @param py
	 * @return 
	 */
	public pointToCell(x: number, y: number): egret.Point {
		var cx: number = Math.floor(x / this._cellWidth);
		var cy: number = Math.floor(y / this._cellHeight);
		return egret.Point.create(cx, cy);
	}

	/**
	 * 网格转坐标点（网格中心点坐标） 
	 * @param  col 列
	 * @param row 行
	 * @return 
	 * 
	 */
	public cellToPoint(col: number, row: number): egret.Point {
		var x: number = (col + 0.5) * this._cellWidth;
		var y: number = (row + 0.5) * this._cellHeight;
		return egret.Point.create(x, y);
	}

	/**
	 * 设置网格在屏幕中心
	 * @col 列
	 * @row 行
	 */
	public setCellOnScreenCenter(col: number, row: number) {
		this.x = this.stage.stageWidth / 2 - (col - 0.5) * this._cellWidth;
		this.y = this.stage.stageHeight / 2 - (row - 0.5) * this._cellHeight;
	}

	/**
	 * 销毁地图下各个层
	 */
	private destroyLayer() {
		//移除未清除的子项
		var layer;
		for (var i: number = 0; i < this.numChildren; i++) {
			layer = this.getChildAt(i);
			if (layer instanceof egret.DisplayObjectContainer && !(layer instanceof TileLayer)) {
				layer.removeChildren();
			}
		}
		this.removeChildren();
		this._effectiveLayer = null;
		this._propLayer = null;
		this._bombLayer = null;
		this._roleLayer = null;
		this._topLayer = null;
		this._roleInfoLayer = null;
	}

	/**
	 * 销毁地图
	 *
	 */
	public destroy() {
		this.destroyLayer();
		this._mapWayArr = null;
	}

	/**
	 * 校正地图摄像机 
	 * @param px
	 * @param py
	 * 
	 */
	public moveCamera(px: number, py: number) {
		let numX: number = 0;
		let numY: number = 0;
		let stageWidth: number = this.stage.stageWidth;
		let stageHeight: number = this.stage.stageHeight;
		if (px + this.x > stageWidth * 0.5 + this._cameraW) { //右移
			numX = -(px - (stageWidth * 0.5 + this._cameraW));
		} else if (px + this.x < stageWidth * 0.5 - this._cameraW) { //左移
			numX = -(px - (stageWidth * 0.5 - this._cameraW));
		} else {
			numX = this.x;  //中间范围，不动
		}

		if (py + this.y > stageHeight * 0.5 + this._cameraH) { //上移
			numY = -(py - (stageHeight * 0.5 + this._cameraH));
		} else if (py + this.y < stageHeight * 0.5 - this._cameraH) { //下移
			numY = -(py - (stageHeight * 0.5 - this._cameraH));
		} else {
			numY = this.y; //中间范围，不动
		}
		let dx: number = numX - this.x;
		let dy: number = numY - this.y;
		this.x = numX;
		this.y = numY;
		//预加载更新瓦片
		this.m_concularUpdate.x += dx;
		this.m_concularUpdate.y += dy;
		if (Math.abs(this.m_concularUpdate.x) >= this._cellWidth && Math.floor(dx) != 0) {
			if (dx > 0) {
				this.m_concularUpdate.x -= this._cellWidth;
			} else {
				this.m_concularUpdate.x += this._cellWidth;
			}
			this.m_isUpdateTile = true;
		}
		// debug("here i am ",Math.floor(this.m_concularUpdate.y % this._cellHeight) );
		if (Math.abs(this.m_concularUpdate.y) >= this._cellHeight && Math.floor(dy) != 0) {
			if (dy > 0) {
				this.m_concularUpdate.y -= this._cellHeight;
			} else {
				this.m_concularUpdate.y += this._cellHeight;
			}
			this.m_isUpdateTile = true;
		}
		if (this.m_isUpdateTile) {
			this.m_isUpdateTile = false;
		}
	}

	/**
	 * 判断指定格子是否是路
	 * @param row
	 * @param col
	 * @returns {boolean}
	 */
	public checkWay(row: number, col: number): boolean {
		return MapCellData.checkWay(col, row);
	}
	/**
	 * 得到地图的空置位置
	 */
	private getEmptyCell(): egret.Point[] {
		let points: egret.Point[] = [];
		for (let i: number = 0; i < this._cellRow; i++) {
			for (let j: number = 0; j < this._cellCol; j++) {
				if (this.checkWay(i, j)) {
					points.push(egret.Point.create(i, j));
				}
			}
		}
		return points;
	}

	/** 背景瓦片 */
	public get bgLayerTile(): TileLayer {
		return this._bgLayerTile;
	}

	/** 顶层瓦片 */
	public get topLayer(): egret.DisplayObjectContainer {
		return this._topLayer;
	}

	/**
	 * 角色名字层
	 */
	public get roleInfoLayer(): egret.DisplayObjectContainer {
		return this._roleInfoLayer;
	}

	/** 道具层 */
	public get propLayer(): egret.DisplayObjectContainer {
		return this._propLayer;
	}

	/** 炸弹层 */
	public get bombLayer(): egret.DisplayObjectContainer {
		return this._bombLayer;
	}

	/** 角色层 */
	public get roleLayer(): egret.DisplayObjectContainer {
		return this._roleLayer;
	}
	/** 效果层 */
	public get effectLayer(): egret.DisplayObjectContainer {
		return this._effectiveLayer;
	}

	/** 地图编号 */
	public get mapId(): number {
		return this._mapId;
	}

	/** 地图Id*/
	public set mapId(value: number) {
		this._mapId = value;
	}

	/** 地图路径层数据 */
	public get mapWayArr(): Array<any> {
		return this._mapWayArr;
	}

	/** 地图宽度 */
	public get mapWidth(): number {
		return this._mapWidth;
	}

	/** 地图高度 */
	public get mapHeight(): number {
		return this._mapHeight;
	}

	/** 网格行数 */
	public get cellRow(): number {
		return this._cellRow;
	}

	/** 网格列数 */
	public get cellCol(): number {
		return this._cellCol;
	}

	/** 瓦片宽度 */
	public get tileWidth(): number {
		return this._tileWidth;
	}

	/** 瓦片高度 */
	public get tileHeight(): number {
		return this._tileHeight;
	}

	/** 网格宽度 */
	public get cellWidth(): number {
		return this._cellWidth;
	}

	/** 网格高度 */
	public get cellHeight(): number {
		return this._cellHeight;
	}
}

