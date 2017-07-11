/**
 * 游戏地图实现类 
 * <p>本地图类为单例模式，基于地图类的实现可以继承本类来完成。</p>
 * 
 */
class Map extends egret.DisplayObjectContainer {
	/**
	 * 地图数据
	 */
	private m_data: MapData;
	/**
	 * camera横向移动宽度
	 */
	private m_cameraW: number = 0;
	/**
	 * camera竖向移动宽度
	 */
	private m_cameraH: number = 0;
	//判断地图更新
	private m_concularUpdate: egret.Point = egret.Point.create(0, 0);
	//是否地图更新
	private m_isUpdateTile: boolean = false;
	//当前视野网格
	public currentViewCell: egret.Rectangle;
	//当前视野区域
	public currentViewArea: egret.Rectangle;

	public constructor() {
		super();
		this.touchEnabled = false;
		this.touchChildren = false;
	}

	public init(data:MapData) {
		this.m_data = data;
		var config: Object = data.config;
		if (config) {

		}
		//摄象机宽度
		this.m_cameraW = this.m_data.tileWidth;
		this.m_cameraH = this.m_data.tileHeight;
	}

	public create() {
		this.createTileLayer();
	}

	/**
	 * 获取场景可视区域
	 */
	public getViewArea(): egret.Rectangle {
		var x: number = Math.max(-this.x, 0);
		var y: number = Math.max(-this.y, 0);
		var viewW: number = Math.min(this.m_data.mapWidth - x, this.stage.stageWidth);
		var viewH: number = Math.min(this.m_data.mapHeight - y, this.stage.stageHeight);
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
		var rowIndex = Math.floor(viewArea.y / this.m_data.tileHeight);
		var colIndex = Math.floor(viewArea.x / this.m_data.tileHeight);
		var rowCount = Math.ceil(viewArea.height / this.m_data.tileHeight);
		var colCount = Math.ceil(viewArea.width / this.m_data.tileWidth);

		//外围加一圈网格
		if (rowIndex > 0) {
			rowIndex--;
			rowCount++;
		}
		if (colIndex > 0) {
			colIndex--;
			colCount++;
		}
		if (rowIndex + rowCount < this.m_data.rows) {
			rowCount++;
		}
		if (colIndex + colCount < this.m_data.cols) {
			colCount++;
		}
		return new egret.Rectangle(colIndex, rowIndex, colCount, rowCount);
	}

	private createTileLayer() {
		let layer: TileLayer = <TileLayer>core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_BG);
		if (layer) {
			layer.init(this.m_data);
			layer.create(MapSetting.BG_LAYER);
			layer.create(MapSetting.DECORATION_LAYER);
		}
		TileCover.addAllToLayer();
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
		var cx: number = Math.floor(x / this.m_data.tileWidth);
		var cy: number = Math.floor(y / this.m_data.tileHeight);
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
		var x: number = (col + 0.5) * this.m_data.tileWidth;
		var y: number = (row + 0.5) * this.m_data.tileHeight;
		return egret.Point.create(x, y);
	}

	/**
	 * 设置网格在屏幕中心
	 * @col 列
	 * @row 行
	 */
	public setCellOnScreenCenter(col: number, row: number) {
		this.x = this.stage.stageWidth / 2 - (col - 0.5) * this.m_data.tileWidth;
		this.y = this.stage.stageHeight / 2 - (row - 0.5) * this.m_data.tileHeight;
	}

	/**
	 * 销毁地图下各个层
	 */
	private destroyLayer() {
		//移除未清除的子项
		let layer: core.Layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_BG);
		if (layer) {
			layer.removeChildren();
		}
		layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_EFFECT);
		if (layer) {
			layer.removeChildren();
		}
		layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_GOODS);
		if (layer) {
			layer.removeChildren();
		}
		layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_ROLE);
		if (layer) {
			layer.removeChildren();
		}
		layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_TOP);
		if (layer) {
			layer.removeChildren();
		}
		this.removeChildren();
	}

	/**
	 * 销毁地图
	 *
	 */
	public destroy() {
		this.destroyLayer();
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
		if (px + this.x > stageWidth * 0.5 + this.m_cameraW) { //右移
			numX = -(px - (stageWidth * 0.5 + this.m_cameraW));
		} else if (px + this.x < stageWidth * 0.5 - this.m_cameraW) { //左移
			numX = -(px - (stageWidth * 0.5 - this.m_cameraW));
		} else {
			numX = this.x;  //中间范围，不动
		}

		if (py + this.y > stageHeight * 0.5 + this.m_cameraH) { //上移
			numY = -(py - (stageHeight * 0.5 + this.m_cameraH));
		} else if (py + this.y < stageHeight * 0.5 - this.m_cameraH) { //下移
			numY = -(py - (stageHeight * 0.5 - this.m_cameraH));
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
		if (Math.abs(this.m_concularUpdate.x) >= this.m_data.tileWidth && Math.floor(dx) != 0) {
			if (dx > 0) {
				this.m_concularUpdate.x -= this.m_data.tileWidth;
			} else {
				this.m_concularUpdate.x += this.m_data.tileWidth;
			}
			this.m_isUpdateTile = true;
		}
		if (Math.abs(this.m_concularUpdate.y) >= this.m_data.tileHeight && Math.floor(dy) != 0) {
			if (dy > 0) {
				this.m_concularUpdate.y -= this.m_data.tileHeight;
			} else {
				this.m_concularUpdate.y += this.m_data.tileHeight;
			}
			this.m_isUpdateTile = true;
		}
		if (this.m_isUpdateTile) {
			this.m_isUpdateTile = false;
		}
	}
}

