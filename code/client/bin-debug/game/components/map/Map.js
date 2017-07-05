var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏地图实现类
 * <p>本地图类为单例模式，基于地图类的实现可以继承本类来完成。</p>
 *
 */
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        /** 地图编号 */
        _this._mapId = 0;
        /** 地图宽度 */
        _this._mapWidth = 0;
        /** 地图高度 */
        _this._mapHeight = 0;
        /** 瓦片宽度 */
        _this._tileWidth = 0;
        /** 瓦片高度 */
        _this._tileHeight = 0;
        /** 网格行数 */
        _this._cellRow = 0;
        /** 网格列数 */
        _this._cellCol = 0;
        /** 网格宽度 */
        _this._cellWidth = 0;
        /** 网格高度 */
        _this._cellHeight = 0;
        //camera横向移动宽度
        _this._cameraW = 0;
        //camera竖向移动宽度
        _this._cameraH = 0;
        //判断地图更新
        _this.m_concularUpdate = egret.Point.create(0, 0);
        //是否地图更新
        _this.m_isUpdateTile = false;
        _this.tt = false;
        _this.timerT = 0;
        _this.ttOffset = 1;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    Map.prototype.init = function (mapId) {
        this.mapId = mapId;
        if (MapCellData.currentMapId !== mapId) {
            MapCellData.currentMapId = mapId;
            MapCellData.clear();
        }
        var mapConfigs = Config.getConfig(MapCfgConfig);
        var mapConfig = mapConfigs.get(mapId);
        var configName = mapConfig.mapData + "_json";
        var config = MapCellData.mapOriginalData = RES.getRes(configName);
        if (!config) {
            // trace(`地图:${configName}配置不存在`);
            return;
        }
        //默认使用一张图
        var tileInfo = config['tilesets'][0];
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
    };
    Map.prototype.create = function () {
        this.createTileLayer(MapCellData.mapOriginalData['layers']);
    };
    /**
     * 获取场景可视区域
     */
    Map.prototype.getViewArea = function () {
        var x = Math.max(-this.x, 0);
        var y = Math.max(-this.y, 0);
        var viewW = Math.min(this._mapWidth - x, this.stage.stageWidth);
        var viewH = Math.min(this._mapHeight - y, this.stage.stageHeight);
        if (this.x > 0) {
            viewW = this.stage.stageWidth - this.x;
        }
        if (this.y > 0) {
            viewH = this.stage.stageHeight - this.y;
        }
        var viewArea = new egret.Rectangle(x, y, viewW, viewH);
        return viewArea;
    };
    /**
     * 是否在可视区域内
     * @x 坐标X
     * @y 坐标y
     */
    Map.prototype.isInViewArea = function (x, y) {
        var viewArea = this.currentViewArea ? this.currentViewArea : this.getViewArea();
        return viewArea.contains(x, y);
    };
    /**
     * 是否在可视区网格内（推荐用isInViewArea，因为少了一层运算）
     * @col 列
     * @row 行
     */
    Map.prototype.isInViewCell = function (col, row) {
        var viewCell = this.currentViewCell ? this.currentViewCell : this.getViewCell();
        return viewCell.contains(col, row);
    };
    /**
     * 获取可视网格，屏幕外围加一圈网格
     */
    Map.prototype.getViewCell = function () {
        var viewArea = this.getViewArea();
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
    };
    Map.prototype.createTileLayer = function (layersArr) {
        if (this._mapId != this._bgLayerTile.mapId) {
            this._bgLayerTile.init(this._mapId, this._cellCol, this.cellRow, this._tileWidth, this._tileHeight);
            this._bgLayerTile.create(MapSetting.BG_LAYER);
            this._bgLayerTile.create(MapSetting.DECORATION_LAYER);
        }
        TileCover.addAllToLayer(this);
    };
    Map.prototype.initMapLayer = function () {
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
    };
    /**
     * 地图移动
     *@param moveOffset  地图移动偏移量
     */
    Map.prototype.moveMap = function (moveOffset) {
        this.x += moveOffset.x;
        this.y += moveOffset.y;
    };
    /**
     * 坐标点转网格
     * @param px
     * @param py
     * @return
     */
    Map.prototype.pointToCell = function (x, y) {
        var cx = Math.floor(x / this._cellWidth);
        var cy = Math.floor(y / this._cellHeight);
        return egret.Point.create(cx, cy);
    };
    /**
     * 网格转坐标点（网格中心点坐标）
     * @param  col 列
     * @param row 行
     * @return
     *
     */
    Map.prototype.cellToPoint = function (col, row) {
        var x = (col + 0.5) * this._cellWidth;
        var y = (row + 0.5) * this._cellHeight;
        return egret.Point.create(x, y);
    };
    /**
     * 设置网格在屏幕中心
     * @col 列
     * @row 行
     */
    Map.prototype.setCellOnScreenCenter = function (col, row) {
        this.x = this.stage.stageWidth / 2 - (col - 0.5) * this._cellWidth;
        this.y = this.stage.stageHeight / 2 - (row - 0.5) * this._cellHeight;
    };
    /**
     * 销毁地图下各个层
     */
    Map.prototype.destroyLayer = function () {
        //移除未清除的子项
        var layer;
        for (var i = 0; i < this.numChildren; i++) {
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
    };
    /**
     * 销毁地图
     *
     */
    Map.prototype.destroy = function () {
        this.destroyLayer();
        this._mapWayArr = null;
    };
    /**
     * 校正地图摄像机
     * @param px
     * @param py
     *
     */
    Map.prototype.moveCamera = function (px, py) {
        var numX = 0;
        var numY = 0;
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        if (px + this.x > stageWidth * 0.5 + this._cameraW) {
            numX = -(px - (stageWidth * 0.5 + this._cameraW));
        }
        else if (px + this.x < stageWidth * 0.5 - this._cameraW) {
            numX = -(px - (stageWidth * 0.5 - this._cameraW));
        }
        else {
            numX = this.x; //中间范围，不动
        }
        if (py + this.y > stageHeight * 0.5 + this._cameraH) {
            numY = -(py - (stageHeight * 0.5 + this._cameraH));
        }
        else if (py + this.y < stageHeight * 0.5 - this._cameraH) {
            numY = -(py - (stageHeight * 0.5 - this._cameraH));
        }
        else {
            numY = this.y; //中间范围，不动
        }
        var dx = numX - this.x;
        var dy = numY - this.y;
        this.x = numX;
        this.y = numY;
        //预加载更新瓦片
        this.m_concularUpdate.x += dx;
        this.m_concularUpdate.y += dy;
        if (Math.abs(this.m_concularUpdate.x) >= this._cellWidth && Math.floor(dx) != 0) {
            if (dx > 0) {
                this.m_concularUpdate.x -= this._cellWidth;
            }
            else {
                this.m_concularUpdate.x += this._cellWidth;
            }
            this.m_isUpdateTile = true;
        }
        // debug("here i am ",Math.floor(this.m_concularUpdate.y % this._cellHeight) );
        if (Math.abs(this.m_concularUpdate.y) >= this._cellHeight && Math.floor(dy) != 0) {
            if (dy > 0) {
                this.m_concularUpdate.y -= this._cellHeight;
            }
            else {
                this.m_concularUpdate.y += this._cellHeight;
            }
            this.m_isUpdateTile = true;
        }
        if (this.m_isUpdateTile) {
            this.m_isUpdateTile = false;
        }
    };
    /**
     * 判断指定格子是否是路
     * @param row
     * @param col
     * @returns {boolean}
     */
    Map.prototype.checkWay = function (row, col) {
        return MapCellData.checkWay(col, row);
    };
    /**
     * 得到地图的空置位置
     */
    Map.prototype.getEmptyCell = function () {
        var points = [];
        for (var i = 0; i < this._cellRow; i++) {
            for (var j = 0; j < this._cellCol; j++) {
                if (this.checkWay(i, j)) {
                    points.push(egret.Point.create(i, j));
                }
            }
        }
        return points;
    };
    Object.defineProperty(Map.prototype, "bgLayerTile", {
        /** 背景瓦片 */
        get: function () {
            return this._bgLayerTile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "topLayer", {
        /** 顶层瓦片 */
        get: function () {
            return this._topLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "roleInfoLayer", {
        /**
         * 角色名字层
         */
        get: function () {
            return this._roleInfoLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "propLayer", {
        /** 道具层 */
        get: function () {
            return this._propLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "bombLayer", {
        /** 炸弹层 */
        get: function () {
            return this._bombLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "roleLayer", {
        /** 角色层 */
        get: function () {
            return this._roleLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "effectLayer", {
        /** 效果层 */
        get: function () {
            return this._effectiveLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "mapId", {
        /** 地图编号 */
        get: function () {
            return this._mapId;
        },
        /** 地图Id*/
        set: function (value) {
            this._mapId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "mapWayArr", {
        /** 地图路径层数据 */
        get: function () {
            return this._mapWayArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "mapWidth", {
        /** 地图宽度 */
        get: function () {
            return this._mapWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "mapHeight", {
        /** 地图高度 */
        get: function () {
            return this._mapHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "cellRow", {
        /** 网格行数 */
        get: function () {
            return this._cellRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "cellCol", {
        /** 网格列数 */
        get: function () {
            return this._cellCol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "tileWidth", {
        /** 瓦片宽度 */
        get: function () {
            return this._tileWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "tileHeight", {
        /** 瓦片高度 */
        get: function () {
            return this._tileHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "cellWidth", {
        /** 网格宽度 */
        get: function () {
            return this._cellWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "cellHeight", {
        /** 网格高度 */
        get: function () {
            return this._cellHeight;
        },
        enumerable: true,
        configurable: true
    });
    return Map;
}(egret.DisplayObjectContainer));
__reflect(Map.prototype, "Map");
