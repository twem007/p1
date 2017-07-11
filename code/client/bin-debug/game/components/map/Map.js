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
        /**
         * camera横向移动宽度
         */
        _this.m_cameraW = 0;
        /**
         * camera竖向移动宽度
         */
        _this.m_cameraH = 0;
        //判断地图更新
        _this.m_concularUpdate = egret.Point.create(0, 0);
        //是否地图更新
        _this.m_isUpdateTile = false;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        return _this;
    }
    Map.prototype.init = function (data) {
        this.m_data = data;
        var config = data.config;
        if (config) {
        }
        //摄象机宽度
        this.m_cameraW = this.m_data.tileWidth;
        this.m_cameraH = this.m_data.tileHeight;
    };
    Map.prototype.create = function () {
        this.createTileLayer();
    };
    /**
     * 获取场景可视区域
     */
    Map.prototype.getViewArea = function () {
        var x = Math.max(-this.x, 0);
        var y = Math.max(-this.y, 0);
        var viewW = Math.min(this.m_data.mapWidth - x, this.stage.stageWidth);
        var viewH = Math.min(this.m_data.mapHeight - y, this.stage.stageHeight);
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
    };
    Map.prototype.createTileLayer = function () {
        var layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_BG);
        if (layer) {
            layer.init(this.m_data);
            layer.create(MapSetting.BG_LAYER);
            layer.create(MapSetting.DECORATION_LAYER);
        }
        TileCover.addAllToLayer();
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
        var cx = Math.floor(x / this.m_data.tileWidth);
        var cy = Math.floor(y / this.m_data.tileHeight);
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
        var x = (col + 0.5) * this.m_data.tileWidth;
        var y = (row + 0.5) * this.m_data.tileHeight;
        return egret.Point.create(x, y);
    };
    /**
     * 设置网格在屏幕中心
     * @col 列
     * @row 行
     */
    Map.prototype.setCellOnScreenCenter = function (col, row) {
        this.x = this.stage.stageWidth / 2 - (col - 0.5) * this.m_data.tileWidth;
        this.y = this.stage.stageHeight / 2 - (row - 0.5) * this.m_data.tileHeight;
    };
    /**
     * 销毁地图下各个层
     */
    Map.prototype.destroyLayer = function () {
        //移除未清除的子项
        var layer = core.LayerCenter.getInstance().getLayer(LayerEnum.MAP_BG);
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
    };
    /**
     * 销毁地图
     *
     */
    Map.prototype.destroy = function () {
        this.destroyLayer();
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
        if (px + this.x > stageWidth * 0.5 + this.m_cameraW) {
            numX = -(px - (stageWidth * 0.5 + this.m_cameraW));
        }
        else if (px + this.x < stageWidth * 0.5 - this.m_cameraW) {
            numX = -(px - (stageWidth * 0.5 - this.m_cameraW));
        }
        else {
            numX = this.x; //中间范围，不动
        }
        if (py + this.y > stageHeight * 0.5 + this.m_cameraH) {
            numY = -(py - (stageHeight * 0.5 + this.m_cameraH));
        }
        else if (py + this.y < stageHeight * 0.5 - this.m_cameraH) {
            numY = -(py - (stageHeight * 0.5 - this.m_cameraH));
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
        if (Math.abs(this.m_concularUpdate.x) >= this.m_data.tileWidth && Math.floor(dx) != 0) {
            if (dx > 0) {
                this.m_concularUpdate.x -= this.m_data.tileWidth;
            }
            else {
                this.m_concularUpdate.x += this.m_data.tileWidth;
            }
            this.m_isUpdateTile = true;
        }
        if (Math.abs(this.m_concularUpdate.y) >= this.m_data.tileHeight && Math.floor(dy) != 0) {
            if (dy > 0) {
                this.m_concularUpdate.y -= this.m_data.tileHeight;
            }
            else {
                this.m_concularUpdate.y += this.m_data.tileHeight;
            }
            this.m_isUpdateTile = true;
        }
        if (this.m_isUpdateTile) {
            this.m_isUpdateTile = false;
        }
    };
    return Map;
}(egret.DisplayObjectContainer));
__reflect(Map.prototype, "Map");
//# sourceMappingURL=Map.js.map